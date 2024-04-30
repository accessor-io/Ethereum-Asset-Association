
from flask import Flask, request
import os
from dotenv import load_dotenv

# Assuming necessary functions like make_app are defined and imported

app = Flask(__name__)

load_dotenv()  # Load environment variables

@app.route('/')
def handle_request():
    doh_gateway_url = os.getenv('DOH_GATEWAY_URL')
    # Placeholder function, simulate DNS query
    def doh_query(url):
        return 'DNS query processed for ' + url
    # Create app instance using environment vars with placeholder server handling
    server_app = make_app(doh_query(doh_gateway_url), '/', None)
    return 'Request handled by server app: ' + server_app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)
    print('Server on port 8081 is running')
