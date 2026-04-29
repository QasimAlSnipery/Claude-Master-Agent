#!/usr/bin/env python3
"""
Advertorial Builder
===================
Combines a JSON content file with template.html to produce a
ready-to-upload HTML advertorial for Shopify.

Usage:
    python build.py content-felora-cat-hydration.json

Requirements:
    pip install jinja2

Output:
    Creates <output_filename>.html in the same directory as the content file.
"""

import json
import sys
import os
from jinja2 import Environment, FileSystemLoader


def build(content_file):
    script_dir = os.path.dirname(os.path.abspath(__file__))

    with open(content_file, "r", encoding="utf-8") as f:
        content = json.load(f)

    env = Environment(
        loader=FileSystemLoader(script_dir),
        autoescape=False,
    )

    template = env.get_template("template.html")
    output = template.render(**content)

    output_filename = content.get("output_filename", "output") + ".html"
    output_path = os.path.join(
        os.path.dirname(os.path.abspath(content_file)), output_filename
    )

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"Built: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python build.py <content-file.json>")
        print("Example: python build.py content-felora-cat-hydration.json")
        sys.exit(1)

    content_file = sys.argv[1]

    if not os.path.exists(content_file):
        print(f"Error: content file not found: {content_file}")
        sys.exit(1)

    build(content_file)
    print("Done.")
