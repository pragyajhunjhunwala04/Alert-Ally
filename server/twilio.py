import requests
import json

with open('secrets.json') as f:
    secrets = json.load(f)

auth_token = secrets['auth_token']
account_sid = secrets['account_sid']
URL = secrets['url']

url = URL
data = {
    'To': '+18777804236',
    'From': '+18779089736',
    'Body': 'Hello from Twilio'
}
auth = (account_sid,auth_token)

#twilio api call
response = requests.post(url, data=data, auth=auth)

print(response.status_code)
print(response.json())

#convert to java script