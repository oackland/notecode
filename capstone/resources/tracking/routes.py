from flask import Blueprint, render_template
from flask import request, jsonify
from bs4 import BeautifulSoup
from flask_cors import CORS

import requests

prices = Blueprint("prices", __name__)
CORS(prices)


@prices.route("/tracking-docs")
def tracking():
    return render_template("priceTracker.html")


@prices.route("/track-price", methods=["POST"])
def track_price():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")

        product_name = soup.find("title").get_text()
        product_price = 10.00

        item = {"name": product_name, "price": product_price}
        tracked_items.append(item)

        return jsonify({"message": "Successfully tracked the product."})

    except Exception as e:
        return jsonify({"error": "An error occurred while tracking the product."}), 500


tracked_items = [
    {"name": "Item1", "price": 10.99},
    {"name": "Item2", "price": 23.99},
]  # Example items


@prices.route("/price-updates", methods=["GET"])
def get_price_updates():
    return jsonify({"items": tracked_items})
