from flask import Flask
app = Flask(__name__, static_folder="public_html/static")

@app.route('/')
def load_root():
    f = open('public_html/index.html', 'r')
    raw_data = f.read()
    return raw_data

@app.route('/<path:name>')
def load_file(name=None):
    url = 'public_html/' + name
    f = open(url, 'r')
    raw_data = f.read()
    return raw_data

if __name__ == "__main__":
    app.run()