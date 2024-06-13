import phonenumbers
import pycountry
import folium
from opencage.geocoder import OpenCageGeocode
from phonenumbers import carrier
from phonenumbers import geocoder
# phone number in a string
phonenumber_string = "+442083661177"
Key = '3e17fd85adcd451cb8792e82110b9bd4'
# parse string to a PhoneNumber object
x = phonenumbers.parse(phonenumber_string)
print('Country code :', x.country_code)

# get region code
region_code = phonenumbers.region_code_for_country_code(x.country_code)
print('Region code  :', region_code)

# get country name
country = pycountry.countries.get(alpha_2=region_code)
name = country.name
print('Country name :', name)

geocoder = OpenCageGeocode(Key)
query = str(name)

results = geocoder.geocode(query)

lat = results[0]['geometry']['lat']

lng = results[0]['geometry']['lng']

print(lat, lng)
myMap = folium.Map(location=[lat, lng], zoom_start=9)
folium.Marker([lat, lng], popup=name).add_to((myMap))
myMap.save("myLocation.html")
