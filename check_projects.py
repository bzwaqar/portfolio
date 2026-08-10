from pymongo import MongoClient

client = MongoClient("mongodb+srv://bbzzwaqar47_db_user:V2QSTtv9UQy96APC@cluster0.5rmqglq.mongodb.net/")
db = client.get_database("My_portfolio_data")
projects = db.get_collection("projects").find({})

print("Projects with images:")
for p in projects:
    if p.get('image'):
        print(f"slug: {p.get('slug')} -> url: {p['image'].get('url')}")
    else:
        print(f"slug: {p.get('slug')} -> NO IMAGE")
