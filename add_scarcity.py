import json
import uuid

with open("roly-watch-template-modified.json", "r", encoding="utf-8") as f:
    t = json.load(f)

main = t["sections"]["main"]
blocks = main["blocks"]
block_order = main["block_order"]

# Generate stable keys
urgency_key = "urgency_scarcity_roly"
inventory_key = "inventory_scarcity_roly"

# Add urgency block
blocks[urgency_key] = {
    "type": "urgency",
    "settings": {
        "urgency": "🔥 HIGH DEMAND — Only 7 Units Left At This Price",
        "color_scheme": "accent-1",
        "margin_top": 0,
        "margin_bottom": 9
    }
}

# Add inventory block
blocks[inventory_key] = {
    "type": "inventory",
    "settings": {
        "text_style": "uppercase",
        "inventory_threshold": 20,
        "show_inventory_quantity": True,
        "margin_top": 0,
        "margin_bottom": 9
    }
}

# Insert both right after "price" block in block_order
price_idx = block_order.index("price")
block_order.insert(price_idx + 1, urgency_key)
block_order.insert(price_idx + 2, inventory_key)

main["block_order"] = block_order

with open("roly-watch-template-modified.json", "w", encoding="utf-8") as f:
    json.dump(t, f, ensure_ascii=False, indent=2)

print("Done. Block order:", block_order[:8])
