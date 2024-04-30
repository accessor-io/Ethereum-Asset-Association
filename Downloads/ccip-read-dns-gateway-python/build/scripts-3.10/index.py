
from flask import Flask
from dotenv import load_dotenv
import os

# Assuming necessary classes and methods are defined and imported

load_dotenv('../.env')

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Server is running!'

if __name__ == '__main__':
    doh_gateway_url = os.getenv('DOH_GATEWAY_URL')
    # Simulate the DNS query function, actual implementation needed
    def doh_query(url):
        return f'Querying DNS at {url}'

    # Replace 'Server' with the actual server class when defined, simulating the server behavior for demonstration
    server_app = make_app(doh_query(doh_gateway_url), '/', None) # Pass the actual server class when defined
    app.run(host='0.0.0.0', port=8080)
    print('Server listening on port 8080')
