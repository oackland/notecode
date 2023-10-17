from flask import Blueprint, jsonify, render_template, request, Flask
import requests
import os

from flask_cors import CORS

api = Blueprint("api", __name__)
CORS(api)
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
API_KEY = os.environ.get("WEATHER_API_KEY", "8d147031dc4e997fc0b84ac609f3f86")


def fetch_ip_info():
    try:
        ip_info_response = requests.get("https://ipinfo.io/json")
        ip_info = ip_info_response.json()

        return {
            "ip": ip_info.get("ip"),
            "hostname": ip_info.get("hostname"),
            "city": ip_info.get("city"),
            "region": ip_info.get("region"),
            "country": ip_info.get("country"),
            "loc": ip_info.get("loc"),
            "org": ip_info.get("org"),
            "postal": ip_info.get("postal"),
            "timezone": ip_info.get("timezone"),
        }
    except Exception as e:
        return {"error": str(e)}


@api.route("/command", methods=["POST"])
def execute_command():
    command = request.json.get("command", "")

    if command == "/no-addtask":
        # If more commands are to be added, use multiple if-elif checks
        return jsonify({"action": "add_task"}), 200

    return jsonify({"error": "Unknown command"}), 400


@api.route("/weather")
def get_weather_for_server_location():
    city = userlocation()

    params = {"q": city, "units": "metric", "appid": "38d147031dc4e997fc0b84ac609f3f86"}
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    # Extracting required information
    weather_info = {
        "weather": data.get("weather", [{}])[0].get("description"),
        "pressure_in_bar": data.get("main", {}).get("pressure"),
        "temperature_celsius": data.get("main", {}).get("temp"),
        "temperature_fahrenheit": (data.get("main", {}).get("temp") * 9 / 5)
        + 32,  # Convert from Celsius to Fahrenheit
        "icon": data.get("weather", [{}])[0].get("icon"),
        "wind": data.get("wind", {}).get("speed"),
        "sunset": data.get("sys", {}).get("sunset"),
        "sunrise": data.get("sys", {}).get("sunrise"),
        "temp_high_for_day": data.get("main", {}).get("temp_max"),
        "temp_low_for_day": data.get("main", {}).get("temp_min"),
    }

    return jsonify(weather_info)


@api.route("/")
def home():
    return render_template("index.html")


@api.route("/axios")
def axios():
    return render_template("axios.html")


@api.route("/sites")
def sites():
    return render_template("sites.html")


@api.route("/weatherPage")
def weather():
    return render_template("weather.html")


@api.route("/getWeather/<city>", methods=["GET"])
def get_weather(city):
    API_KEY = "38d147031dc4e997fc0b84ac609f3f86"
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "units": "metric", "appid": API_KEY}
    response = requests.get(base_url, params=params)
    return jsonify(response.json())


@api.route("/api/ipinfo")
def get_ip_info_endpoint():
    return jsonify(fetch_ip_info())


def userlocation():
    data = fetch_ip_info()

    # Extracting the city information
    city = data.get("city", None)

    return city


@api.route("/api/userlocation")
def get_user_location():
    city = userlocation()
    if city:
        return jsonify({"city": city})
    else:
        return jsonify({"error": "City not found"}), 400
