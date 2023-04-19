import flask
from flask import request, jsonify
import socket
import whois
import ssl
import dns.resolver
import time
import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup as bs
from urllib.parse import urljoin
wd = "www.kia.com"
app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/hostname", methods=['POST', 'GET'])
def get_hostname_info():
    hosd = {}
    try:
        socket.gethostbyname(wd)
        a = socket.gethostbyname(wd)
        hosd.update({"Valid hostname": a})
    except:
        hosd.update({"Invalid hostname": wd})
    return jsonify(hosd)


@app.route('/whoislookup', methods=['POST', 'GET'])
def get_whois_info():
    whoid = {}
    try:
        w = whois.whois(wd)
        whoid.update({'Whois info': w})
    except Exception as e:
        whoid.update({'Error getting WHOIS': wd})
    return jsonify(whoid)


@app.route("/sslinfo", methods=['POST', 'GET'])
def get_ssl_info():
    with socket.create_connection((wd, 443)) as sock:
        context = ssl.create_default_context()
        with context.wrap_socket(sock, server_hostname=wd) as ssock:
            cert = ssock.getpeercert()
        return jsonify(cert)


@app.route("/dnsinfo", methods=['POST', 'GET'])
def get_dns_records_info():
    dnsd = {}
    ids = [
        'NONE',
        'A',
        'NS',
        'MD',
        'MF',
        'CNAME',
        'SOA',
        'MB',
        'MG',
        'MR',
        'NULL',
        'WKS',
        'PTR',
        'HINFO',
        'MINFO',
        'MX',
        'TXT',
        'RP',
        'AFSDB',
        'X25',
        'ISDN',
        'RT',
        'NSAP',
        'NSAP-PTR',
        'SIG',
        'KEY',
        'PX',
        'GPOS',
        'AAAA',
        'LOC',
        'NXT',
        'SRV',
        'NAPTR',
        'KX',
        'CERT',
        'A6',
        'DNAME',
        'OPT',
        'APL',
        'DS',
        'SSHFP',
        'IPSECKEY',
        'RRSIG',
        'NSEC',
        'DNSKEY',
        'DHCID',
        'NSEC3',
        'NSEC3PARAM',
        'TLSA',
        'HIP',
        'CDS',
        'CDNSKEY',
        'CSYNC',
        'SPF',
        'UNSPEC',
        'EUI48',
        'EUI64',
        'TKEY',
        'TSIG',
        'IXFR',
        'AXFR',
        'MAILB',
        'MAILA',
        'ANY',
        'URI',
        'CAA',
        'TA',
        'DLV',
    ]

    for a in ids:
        try:
            answers = dns.resolver.resolve(wd, a)
            for rdata in answers:
                #print(a, ':', rdata.to_text())
                dnsd[a] = rdata.to_text()
            time.sleep(10)
        except Exception as e:
            pass  # or pass
    return jsonify(dnsd)


@app.route("/httpsecheader", methods=['POST', 'GET'])
def get_hsts():
    ur = 'https://'+wd
    hsd = {}
    response = requests.get(ur)
    headers = response.headers
    cookies = response.cookies

# XXSS block
    try:
        if headers["X-XSS-Protection"]:
            hsd.update({'X-XSS-Protection':  'pass'})
    except KeyError:
        hsd.update({'X-XSS-Protection header not present':  'fail!'})

# NOSNIFF block
    try:
        if headers["X-Content-Type-Options"].lower() == "nosniff":
            hsd.update({'X-Content-Type-Options':  'pass'})
        else:
            hsd.update(
                {'X-Content-Type-Options header not set correctly':  'fail!'})
    except KeyError:
        hsd.update({'X-Content-Type-Options header not present':  'fail!'})

# XFrame block
    try:
        if "deny" in headers["X-Frame-Options"].lower():
            hsd.update({'X-Frame-Options':  'pass'})
        elif "sameorigin" in headers["X-Frame-Options"].lower():
            hsd.update({'X-Frame-Options':  'pass'})
        else:
            hsd.update({'X-Frame-Options header not set correctly':  'fail!'})
    except KeyError:
        hsd.update({'X-Frame-Options header not present':  'fail!'})

# HSTS block
    try:
        if headers["Strict-Transport-Security"]:
            hsd.update({'Strict-Transport-Security':  'pass'})
    except KeyError:
        hsd.update({'Strict-Transport-Security header not present':  'fail!'})

# Policy block
    try:
        if headers["Content-Security-Policy"]:
            hsd.update({'Content-Security-Policy':  'pass'})
    except KeyError:
        hsd.update({'Content-Security-Policy header not present':  'fail!'})

# Cookie blocks
    for cookie in cookies:
        hsd.update({'Set-Cookie':  ''})
        if cookie.secure:
            hsd.update({'Secure':  'pass'})
        else:
            hsd.update({'Secure attribute not set':  'fail!'})
        if cookie.has_nonstandard_attr('httponly') or cookie.has_nonstandard_attr('HttpOnly'):
            hsd.update({'HttpOnly':  'pass'})
        else:
            hsd.update({'HttpOnly attribute not set':  'fail!'})
    return jsonify(hsd)


@app.route("/urlredirection", methods=['POST', 'GET'])
def get_url_redirection():
    links = []
    session = HTMLSession()
    ur = 'https://'+wd
    response = session.get(ur)
    soup = BeautifulSoup(response.text, 'lxml')
    for link in soup.find_all('a', href=True):
        if(link['href'].startswith('./')):
            link['href'] = (ur) + link['href']
        if(link['href'].startswith('/')):
            link['href'] = ur + link['href']
        if(link['href'].startswith('#')):
            continue
        if(link['href'].startswith('http')):
            links.append(link['href'])
        i = 0
        for link in links:
            print(link)
    return jsonify(links)


@app.route("/webpagespeed", methods=['POST', 'GET'])
def get_webpage_speed():
    start = time.time()
    response = requests.get('https://'+wd)
    end = time.time()
    elapsed_time = end - start
    return{"ltime": elapsed_time}


@app.route("/safeweb", methods=['POST', 'GET'])
def get_safeweb():
    chrome_options = Options()

    chrome_options.add_argument("--headless")

    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    url = "https://safeweb.norton.com/"
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    webcheck = wd
    e1 = driver.find_element(By.ID, 'appendedInputButton').send_keys(webcheck)
    submit = driver.find_element(By.ID, 'homeSearchImg')

    submit.click()
    time.sleep(5)

    result = driver.find_element(
        By.XPATH, '//*[@id="bodyContent"]/div/div/div[3]/div[1]/div[1]/div[2]/div[1]/div/b')

    return jsonify(result.text)


@app.route("/phishtank", methods=['POST', 'GET'])
def get_phishtank():
    pdict = {}
    chrome_options = Options()

    chrome_options.add_argument("--headless")

    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    url = "https://phishtank.org/"
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    domain = wd
    e1 = driver.find_element(By.NAME, 'isaphishurl').clear()

    e3 = driver.find_element(By.NAME, 'isaphishurl').send_keys(domain)
    submit = driver.find_element(
        By.XPATH, '//*[@id="maincol"]/div/div[2]/form/p/input[2]')
    submit.click()
    time.sleep(3)

    try:
        submit = driver.find_element(
            By.XPATH, '//*[@id="history"]/table[1]/tbody/tr/td[2]/h3/b')
        pdict.update({"Site details": submit.text})
        if submit.text == "":
            submit = driver.find_element(By.XPATH, '//*[@id="widecol"]/div/h3')
            pdict.update({"Site details": submit.text})

    except:
        submit = driver.find_element(
            By.XPATH, '//*[@id="maincol"]/div/div[2]/form/p/b/tt')
        pdict.update({"No info about": submit.text})
    return (pdict)


@app.route("/xssbasic", methods=['POST', 'GET'])
def get_xssbasic():
    xdict = {}
    url = "https://"+wd

# Step 1: Find all the forms in the page
    soup = bs(requests.get(url).content, "html.parser")
    forms = soup.find_all("form")
    xdict.update({"Number of forms detected": len(forms)})

    # Step 2: Try submitting a payload to each form and check for XSS vulnerability
    js_script = "<script>alert(XSS)</script>"
    for form in forms:
        # Extract form details
        action = form.attrs.get("action", "").lower()
        method = form.attrs.get("method", "get").lower()
        inputs = []
        for input_tag in form.find_all("input"):
            input_type = input_tag.attrs.get("type", "text")
            input_name = input_tag.attrs.get("name")
            inputs.append({"type": input_type, "name": input_name})
        form_details = {"action": action, "method": method, "inputs": inputs}

        # Submit payload to form
        target_url = urljoin(url, action)
        data = {}
        for input in inputs:
            if input["type"] == "text" or input["type"] == "search":
                input["value"] = js_script
            input_name = input.get("name")
            input_value = input.get("value")
            if input_name and input_value:
                data[input_name] = input_value
        if method == "post":
            res = requests.post(target_url, data=data)
        else:
            res = requests.get(target_url, params=data)

        # Check for XSS vulnerability
        content = res.content.decode()
        if js_script in content:
            xdict.update({"XSS Detected": form_details})
        else:
            xdict.update({"XSS not detected on": url})
    return jsonify(xdict)


app.run()