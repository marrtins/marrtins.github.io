import urllib, json
url = "https://api.fifa.com/api/v1/calendar/matches?idseason=254645&idcompetition=17&language=en-GB&count=100"
response = urllib.urlopen(url)
data = json.loads(response.read())
file = open('testfile.json','w')
data2 = {}
if data["Results"][1]["Winner"] is not None:
    print("asd")
#print (data["Results"][0]["Home"]["IdCountry"] + " vs "+data["Results"][0]["Away"]["IdCountry"] + " winner "+data["Results"][1]["Winner"])
for i in range(0,47):
    if data["Results"][i]["Winner"] is None:
        data["Results"][i]["Winner"]="null"
    print (data["Results"][i]["Home"]["IdCountry"] + " vs "+data["Results"][i]["Away"]["IdCountry"] + " winner "+data["Results"][i]["Winner"])
    data2[i] = {'home': data["Results"][i]["Home"]["IdCountry"],'away': data["Results"][i]["Away"]["IdCountry"],'winner': data["Results"][i]["Winner"]}

json.dump(data2,file)