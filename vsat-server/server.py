import flask
from flask import request, jsonify
from flask import make_response
import socket
import whois
import ssl
import dns.resolver
import time
import requests
import re
from bs4 import BeautifulSoup
from requests_html import HTMLSession
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup as bs
from urllib.parse import urljoin
from datetime import datetime
import OpenSSL
import ssl
import sys
from pprint import pprint
import math
from flask import Flask, make_response
from reportlab.pdfgen import canvas
from fpdf import FPDF
import requests
from defusedxml import ElementTree as ET
import html

wd = "www.google.com"
wm = ""
txtval = ""
app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/hostname", methods=['POST', 'GET'])
def get_hostname_info():
    hosd = {}
    try:
        socket.gethostbyname(wd)
        a = socket.gethostbyname(wd)
        hosd.update({"ValidHostname": a})
        hosd.update({"HostnameFlag": True})
    except:
        hosd.update({"Invalid hostname": wd})
        hosd.update({"HostnameFlag": False})

    return jsonify(hosd)


@app.route('/settxt', methods=['POST'])
def settxt():
    data = request.get_json()
    str_payload = data['txt']
    print(str_payload)
    global txtval
    txtval = str_payload
    return jsonify({'message': 'String received in settxt'})


@app.route('/setemail', methods=['POST'])
def setemail():
    data = request.get_json()
    str_payload = data['email']
    print(str_payload)
    global wm
    wm = str_payload
    return jsonify({'message': 'String received in setemail'})


@app.route('/api/endpoint', methods=['POST'])
def receive_string_from_client():
    data = request.get_json()
    str_payload = data['string']
    print(str_payload)
    global wd
    wd = str_payload
    return jsonify({'message': 'String received in url '})


@app.route('/whoislookup', methods=['POST', 'GET'])
def get_whois_info():
    whoid = {}
    try:
        w = whois.whois(wd)
        whoid.update({'Whoisinfo': w})
        whoid.update({"WhoisFlag": True})
    except Exception as e:
        whoid.update({"WhoisFlag": False})
    return jsonify(whoid)


@app.route("/sslinfo", methods=['POST', 'GET'])
def get_ssl_info():
    with socket.create_connection((wd, 443)) as sock:
        context = ssl.create_default_context()
        with context.wrap_socket(sock, server_hostname=wd) as ssock:
            cert = ssock.getpeercert()
        return (cert)


@app.route("/dnsinfo", methods=['POST', 'GET'])
def get_dns_records_info():
    domain = wd
    if domain.startswith("www."):
        domain = domain[4:]
    dns_records = {}

    # A Record
    try:
        A = dns.resolver.resolve(domain, 'A')
        dns_records['A'] = [record.to_text() for record in A]
    except Exception as e:
        dns_records['A'] ='nil'

    # AAAA Record
    try:
        AAAA = dns.resolver.resolve(domain, 'AAAA')
        dns_records['AAAA'] = [record.to_text() for record in AAAA]
    except Exception as e:
        dns_records['AAAA'] ='nil'

    # MX Record
    try:
        MX = dns.resolver.resolve(domain, 'MX')
        mx_data = []
        for record in MX:
            mx_data.append((record.exchange.to_text(), record.preference))
        dns_records['MX'] = mx_data
    except Exception as e:
        dns_records['MX']='nil'

    # NS Record
    try:
        NS = dns.resolver.resolve(domain, 'NS')
        dns_records['NS'] = [record.to_text() for record in NS]
    except Exception as e:
        dns_records['NS'] ='nil'

    # TXT Record
    try:
        TXT = dns.resolver.resolve(domain, 'TXT')
        dns_records['TXT'] = [record.to_text() for record in TXT]
    except Exception as e:
        dns_records['TXT'] ='nil'

    # CNAME Record
    try:
        CNAME = dns.resolver.resolve(domain, 'CNAME')
        dns_records['CNAME'] = [record.to_text() for record in CNAME]
    except Exception as e:
        dns_records['CNAME'] ='nil'

    # CAA Record
    try:
        CAA = dns.resolver.resolve(domain, 'CAA')
        dns_records['CAA'] = [record.to_text() for record in CAA]
    except Exception as e:
        dns_records['CAA'] ='nil'

    # PTR Record
    try:
        PTR = dns.resolver.resolve(domain, 'PTR')
        dns_records['PTR'] = [record.to_text() for record in PTR]
    except Exception as e:
        dns_records['PTR'] ='nil'

    # SOA Record
    try:
        SOA = dns.resolver.resolve(domain, 'SOA')
        dns_records['SOA'] = [record.to_text() for record in SOA]
    except Exception as e:
        dns_records['SOA'] ='nil'

    # SRV Record
    try:
        SRV = dns.resolver.resolve(domain, 'SRV')
        srv_data = []
        for record in SRV:
            srv_data.append((record.target.to_text(), record.port,
                            record.weight, record.priority))
        dns_records['SRV'] = srv_data
    except Exception as e:
        dns_records['SRV'] ='nil'

    return jsonify(dns_records)


@app.route("/httpsecheader", methods=['POST', 'GET'])
def get_hsts():
    flag=0
    try:
        ur = 'https://'+wd
        hsd = {}
        response = requests.get(ur)
        headers = response.headers
        cookies = response.cookies
    except Exception as e:
        hsd.update({'https': 'Not Present'})
        flag+=1
# XXSS block
    try:
        if headers["X-XSS-Protection"]:
            hsd.update({'xssProtect':  'Present'})
    except KeyError:
        hsd.update({'xssProtect':  'Not Present'})
        flag+=1

# NOSNIFF block
    try:
        if headers["X-Content-Type-Options"].lower() == "nosniff":
            hsd.update({'xcontentoptions':  'Present'})
        else:
            hsd.update(
                {'xcontentoptions':  'Not Present'})
            flag+=1
    except KeyError:
        hsd.update({'xcontentoptions':  'Not Present'})
        flag+=1

# XFrame block
    try:
        if "deny" in headers["X-Frame-Options"].lower():
            hsd.update({'frameOptions':  'Present'})
        elif "sameorigin" in headers["X-Frame-Options"].lower():
            hsd.update({'frameOptions':  'Present'})
        else:
            hsd.update({'frameOptions':  'Not Present'})
            flag+=1
    except KeyError:
        hsd.update({'frameOptions':  'Not Present'})
        flag+=1

# HSTS block
    try:
        if headers["Strict-Transport-Security"]:
            hsd.update({'strictTransportSecurity':  'Present'})
    except KeyError:
        hsd.update({'strictTransportSecurity':  'Not Present'})
        flag+=1

# Policy block
    try:
        if headers["Content-Security-Policy"]:
            hsd.update({'ContentSecurityPolicy':  'Present'})
    except KeyError:
        hsd.update({'ContentSecurityPolicy':  'Not Present'})
        flag+=1

# Cookie blocks
    try:
        for cookie in cookies:
            hsd.update({'Set-Cookie':  ''})
            if cookie.secure:
                hsd.update({'SecureCookie':  'Present'})
            else:
                hsd.update({'SecureCookie':  'Not Present'})
                flag+=1
            if cookie.has_nonstandard_attr('httponly') or cookie.has_nonstandard_attr('HttpOnly'):
                hsd.update({'HttpOnlyCookie':  'Present'})
            else:
                hsd.update({'HttpOnlyCookie':  'Not Present'})
                flag+=1
    except KeyError:
        hsd.update({'SecureCookie':  'Not Present'})
        hsd.update({'HttpOnlyCookie':  'Not Present'})
        flag+=2
    
    hsd.update({'falseScore': flag})
    return jsonify(hsd)


@app.route("/urlredirection", methods=['POST', 'GET'])
def get_url_redirection():
    links = []
    linkdict = {}
    linkcount = 0
    session = HTMLSession()
    ur = 'https://'+wd
    response = session.get(ur)
    soup = BeautifulSoup(response.text, 'lxml')
    for link in soup.find_all('a', href=True):
        if(link['href'].startswith('./')):
            link['href'] = (ur) + link['href']
            linkcount = linkcount+1
        if(link['href'].startswith('/')):
            link['href'] = ur + link['href']
            linkcount = linkcount+1
        if(link['href'].startswith('#')):
            continue
        if(link['href'].startswith('http')):
            links.append(link['href'])
            linkcount = linkcount+1
        i = 0
       # for link in links:
          #  print(link)
    linkdict.update({"Links": links})
    linkdict.update({"LinkCount": linkcount})
    return (linkdict)


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
    flag = 0
    domain = "https://"+wd
    e1 = driver.find_element(By.NAME, 'isaphishurl').clear()

    e3 = driver.find_element(By.NAME, 'isaphishurl').send_keys(domain)
    submit = driver.find_element(
        By.XPATH, '//*[@id="maincol"]/div/div[2]/form/p/input[2]')
    submit.click()
    time.sleep(3)

    try:
        submit = driver.find_element(
            By.XPATH, '//*[@id="history"]/table[1]/tbody/tr/td[2]/h3/b')
        pdict.update({"Sitedetails": submit.text})
        if submit.text == "":
            submit = driver.find_element(By.XPATH, '//*[@id="widecol"]/div/h3')
            pdict.update({"Sitedetails": submit.text})

    except:
        url = "https://phishtank.org/"
        driver = webdriver.Chrome(options=chrome_options)
        driver.get(url)

        domain = "http://"+wd
        e1 = driver.find_element(By.NAME, 'isaphishurl').clear()

        e3 = driver.find_element(By.NAME, 'isaphishurl').send_keys(domain)
        submit = driver.find_element(
            By.XPATH, '//*[@id="maincol"]/div/div[2]/form/p/input[2]')
        submit.click()
        time.sleep(3)

        try:
            submit = driver.find_element(
                By.XPATH, '//*[@id="history"]/table[1]/tbody/tr/td[2]/h3/b')
            pdict.update({"Sitedetails": submit.text})
            if submit.text == "":
                submit = driver.find_element(
                    By.XPATH, '//*[@id="widecol"]/div/h3')
                pdict.update({"Sitedetails": submit.text})

        except:
            submit = driver.find_element(
                By.XPATH, '//*[@id="maincol"]/div/div[2]/form/p/b/tt')
            pdict.update({"Sitedetails": "No phishing details found"})
        return (pdict)
    return (pdict)


@app.route("/xssbasic", methods=['POST', 'GET'])
def get_xssbasic():
    xdict = {}
    url = "https://"+wd

# Step 1: Find all the forms in the page
    soup = bs(requests.get(url).content, "html.parser")
    forms = soup.find_all("form")
    xdict.update({"NumberOfFormsDetected": len(forms)})
    if (len(forms)==0):
        xdict.update({"flag": 0})
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
            xdict.update({"XSSDetected": form_details})
            xdict.update({"flag": 1})
        else:
            xdict.update({"XSSNotDetectedOn": url})
            xdict.update({"flag": 0})
    return jsonify(xdict)


@app.route("/txtverification", methods=['POST', 'GET'], strict_slashes=False)
def get_txt_verification():
    dnsd = {}
    ids = ['TXT']
    verd = {}
    for a in ids:
        try:
            answers = dns.resolver.resolve(wd, a)
            for rdata in answers:
                #print(a, ':', rdata.to_text())
                dnsd[a] = rdata.to_text()
            time.sleep(10)
        except Exception as e:
            pass  # or pass
        print(dnsd.get('TXT'))
        print(txtval)
        if dnsd.get('TXT') == txtval:
            verd.update({"TXTstatus": True})
            break
        else:
            verd.update({"TXTstatus": False})
    return jsonify(verd)


@app.route("/sslexpiry", methods=['POST', 'GET'], strict_slashes=False)
def getsslexpiry():
    try:
        expdict = {}
        url = wd
        cert = ssl.get_server_certificate((url, 443))
        x509 = OpenSSL.crypto.load_certificate(
            OpenSSL.crypto.FILETYPE_PEM, cert)
        bytes = x509.get_notAfter()
        timestamp = bytes.decode('utf-8')
        timval = datetime.strptime(
            timestamp, '%Y%m%d%H%M%S%z').date().isoformat()
        expdict.update({"SSLExpiry": timval})
    except Exception as e:
        expdict.update({"SSLExpiry": "No SSL Certificate"})
    return(expdict)


@app.route("/sqlinjection", methods=['POST', 'GET'], strict_slashes=False)
def getsqli():
    s = requests.Session()
    s.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"

    def get_forms(url):
        soup = bs(s.get(url).content, "html.parser")
        return soup.find_all("form")

    def get_form_details(form):
        details = {}
        try:
            action = form.attrs.get("action").lower
        except:
            action = None
        method = form.attrs.get("method", "get").lower
        inputs = []

        for input_tag in form.find_all("input"):
            input_type = input_tag.attrs.get("type", "text")
            input_name = input_tag.attrs.get("name")
            input_value = input_tag.attrs.get("value", "")
            inputs.append({
                "type": input_type,
                "name": input_name,
                "value": input_value,
            })

        details['action'] = action
        details['method'] = method
        details['inputs'] = inputs
        return details

    def vulnerable(response):
        errors = {"quoted string not properly terminated",
                  "warning: mysql",
                  "unclosed quotation mark after the charachter string",
                  "you have an error in your SQL syntax",
                  }
        for error in errors:
            if error in response.content.decode().lower():
                return True
        return False

    def sql_injection_scan(url):
        for c in "\"'":
            new_url = f"{url}{c}"
            print("[!] Trying", new_url)
            # make the HTTP request
            res = s.get(new_url)
            if vulnerable(res):
                print("[+] SQL Injection vulnerability detected, link:", new_url)
                return

        forms = get_forms(url)
        print(f"[+] Detected {len(forms)} forms on {url}.")
        for form in forms:
            form_details = get_form_details(form)
            for c in "\"'":
                data = {}
                for input_tag in form_details["inputs"]:
                    if input_tag["type"] == "hidden" or input_tag["value"]:
                        try:
                            data[input_tag["name"]] = input_tag["value"] + c
                        except:
                            pass
                    elif input_tag["type"] != "submit":
                        data[input_tag["name"]] = f"test{c}"

                url = urljoin(url, str(form_details["action"]))
                if form_details["method"] == "post":
                    res = s.post(url, data=data)
                elif form_details["method"] == "get":
                    res = s.get(url, params=data)

                if vulnerable(res):
                    print("[+] SQL Injection vulnerability detected, link:", url)
                    print("[+] Form:")
                    pprint(form_details)
                    break
    urlToBeChecked = 'https://'+wd
    sql_injection_scan(urlToBeChecked)
    return


@app.route("/webtechscan", methods=['POST', 'GET'], strict_slashes=False)
def getwebtech():
    webdict = {}
    url = "https://"+wd
    try:
        response = requests.get(url)

        server = response.headers.get('server')
        if server:
            webdict.update({"Server": server})

        technologies = []
        content = response.text.lower()
        if 'x-powered-by' in response.headers:
            technologies.extend(re.findall(
                '[\w-]+', response.headers['X-Powered-By']))
        if 'x-aspnet-version' in response.headers:
            technologies.append('ASP.NET')
        if 'x-drupal-cache' in response.headers:
            technologies.append('Drupal')
        if 'x-generator' in response.headers:
            technologies.extend(re.findall(
                '[\w-]+', response.headers['X-Generator']))

        if 'django' in content:
            technologies.append('Django')
        if 'next/static' in content:
            technologies.append('Next.js')
        if 'astro' in content:
            technologies.append('Astro')
        if 'wp-' in content:
            technologies.append('Wordpress')
        if 'bootstrap' in content:
            technologies.append('Bootstrap')
        if 'php' in content:
            technologies.append('PHP')
        if 'jsp' in content:
            technologies.append('JSP')
        if 'webpack' in content:
            technologies.append('Webpack')
        if 'ghost/' in content:
            technologies.append('Ghost')
        if 'django' in response.text.lower():
            technologies.append('Django')
        if 'laravel' in response.text.lower():
            technologies.append('Laravel')
        if 'rails' in response.text.lower():
            technologies.append('Ruby on Rails')
        if 'spring' in response.text.lower():
            technologies.append('Spring')
        if 'symfony' in response.text.lower():
            technologies.append('Symfony')
        if 'express' in response.text.lower():
            technologies.append('Express.js')
        if 'sites.google.com' in response.text.lower():
            technologies.append('Google Sites')

        # Look for JavaScript libraries
        if 'jquery' in response.text.lower():
            technologies.append('jQuery')
        if 'react' in response.text.lower():
            technologies.append('React')
        if 'vue' in response.text.lower():
            technologies.append('Vue.js')
        if 'angular' in response.text.lower():
            technologies.append('Angular')

        # Look for CSS frameworks
        if 'bootstrap' in response.text.lower():
            technologies.append('Bootstrap')
        if 'foundation' in response.text.lower():
            technologies.append('Foundation')

        # Look for CMS platforms
        if 'wordpress' in response.text.lower():
            technologies.append('WordPress')
        if 'joomla' in response.text.lower():
            technologies.append('Joomla!')
        if 'drupal' in response.text.lower():
            technologies.append('Drupal')

        # Look for e-commerce platforms
        if 'magento' in response.text.lower():
            technologies.append('Magento')
        if 'shopify' in response.text.lower():
            technologies.append('Shopify')

        # Look for web servers
        if 'nginx' in response.headers.get('server', '').lower():
            technologies.append('nginx')
        if 'apache' in response.headers.get('server', '').lower():
            technologies.append('Apache')

        if technologies:
            webdict.update({"Technologies": technologies})
        else:
            webdict.update({"Info": "No technologies found."})
    except:
        webdict.update(
            {"Info": "An error occurred while trying to fetch the website."})
    return (webdict)


@app.route("/dataleak", methods=['POST', 'GET'], strict_slashes=False)
def dataleak():
    datad = {}
    email = wm
    chrome_options = Options()
    chrome_options.add_argument("--headless")

    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    url = "https://haveibeenpwned.com/"
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    webcheck = wm
    search_box = driver.find_element(By.NAME, 'Account').send_keys(webcheck)
    submit = driver.find_element(By.XPATH, '//*[@id="searchPwnage"]')
    submit.click()
    time.sleep(8)
    results = driver.find_element(
        By.XPATH, '//*[@id="pwnedWebsiteBanner"]/div/div/div[1]/h2')

    if(results.text == "Oh no — pwned!"):
        # print("Data breach involved")
        datad.update({"DataLeak": True})
    else:
        results = driver.find_element(
            By.XPATH, '//*[@id="noPwnage"]/div/div/div[1]/h2')
        # print(results.text)
        datad.update({"DataLeak": False})
    return jsonify(datad)


@app.route('/download_pdf')
def download_pdf():
    # Margin
    m = 10
    # Page width: Width of A4 is 210mm
    pw = 210 - 2*m
    # Cell height
    ch = 50
    pdf = FPDF()
    pdf.add_page()
    pdf.image('./white.png',
              x=-2, y=0.69, w=60, h=0, type='PNG')
    pdf.set_font('Arial', 'B', 20)
    pdf.cell(w=0, h=40, txt="Security Report", border=0, ln=1, align='C')
    pdf.set_font('Arial', '', 18)
    pdf.cell(w=0, h=15, txt="Report for <company name>", ln=1, align='L')
    pdf.set_font('Arial', 'B', 14)
    pdf.set_fill_color(r=211, g=211, b=211)
    pdf.cell(w=(pw/4), h=25, txt="Web Security", border=1, ln=0, fill=True)
    pdf.set_font('Arial', '', 14)
    pdf.multi_cell(
        w=0, h=25, txt="This and the below cells are multi cells.", border=1, )
    pdf.cell(w=0, h=15, txt=" ", border=0, ln=1)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(w=(pw/4), h=25, txt="Network Security ",
             border=1, ln=0, fill=True)
    pdf.set_font('Arial', '', 14)
    pdf.multi_cell(
        w=0, h=25, txt="This and the below cells are multi cells.", border=1, )
    pdf.cell(w=0, h=15, txt=" ", border=0, ln=1)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(w=(pw/4), h=25, txt="Data Security ", border=1, ln=0, fill=True)
    pdf.set_font('Arial', '', 14)
    pdf.multi_cell(
        w=0, h=25, txt="This and the below cells are multi cells.", border=1, )
    pdf.cell(w=0, h=15, txt=" ", border=0, ln=1)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(w=(pw/4), h=25, txt="Social Security ", border=1, ln=0, fill=True)
    pdf.set_font('Arial', '', 14)
    pdf.multi_cell(
        w=0, h=25, txt="This and the below cells are multi cells.", border=1, )
    pdf_output = pdf.output(dest='S').encode('latin1')
    response = make_response(pdf_output)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=example.pdf'
    return response


@app.route('/privacypolicy')
def privacypolicy():
    url = "https://"+wd
    response = requests.get(url)
    privdict = {}

    if "privacy" in response.text.lower():
        privdict.update({"PrivacyPolicy": True})
    if "privacypolicy" in response.text.lower():
        privdict.update({"PrivacyPolicy": True})
    if "privacy-policy" in response.text.lower():
        privdict.update({"PrivacyPolicy": True})
    if "terms" in response.text.lower():
        privdict.update({"PrivacyPolicy": True})
    else:
        privdict.update({"PrivacyPolicy": False})
    return(privdict)


@app.route('/cvelookup')
def cvelookup():
    webdict = {}
    url = "https://"+wd
    try:
        response = requests.get(url)

        server = response.headers.get('server')
        if server:
            webdict.update({"Server": server})

            technologies = []
            content = response.text.lower()
            if 'x-powered-by' in response.headers:
                technologies.extend(re.findall(
                    '[\w-]+', response.headers['X-Powered-By']))
            if 'x-aspnet-version' in response.headers:
                technologies.append('ASP.NET')
            if 'x-drupal-cache' in response.headers:
                technologies.append('Drupal')
            if 'x-generator' in response.headers:
                technologies.extend(re.findall(
                    '[\w-]+', response.headers['X-Generator']))

            if 'django' in content:
                technologies.append('Django')
            if 'next/static' in content:
                technologies.append('Next.js')
            if 'astro' in content:
                technologies.append('Astro')
            if 'wp-' in content:
                technologies.append('Wordpress')
            if 'bootstrap' in content:
                technologies.append('Bootstrap')
            if 'php' in content:
                technologies.append('PHP')
            if 'jsp' in content:
                technologies.append('JSP')
            if 'webpack' in content:
                technologies.append('Webpack')
            if 'ghost/' in content:
                technologies.append('Ghost')
            if 'django' in response.text.lower():
                technologies.append('Django')
            if 'laravel' in response.text.lower():
                technologies.append('Laravel')
            if 'rails' in response.text.lower():
                technologies.append('Ruby on Rails')
            if 'spring' in response.text.lower():
                technologies.append('Spring')
            if 'symfony' in response.text.lower():
                technologies.append('Symfony')
            if 'express' in response.text.lower():
                technologies.append('Express.js')
            if 'sites.google.com' in response.text.lower():
                technologies.append('Google Sites')

            # Look for JavaScript libraries
            if 'jquery' in response.text.lower():
                technologies.append('jQuery')
            if 'react' in response.text.lower():
                technologies.append('React')
            if 'vue' in response.text.lower():
                technologies.append('Vue.js')
            if 'angular' in response.text.lower():
                technologies.append('Angular')

            # Look for CSS frameworks
            if 'bootstrap' in response.text.lower():
                technologies.append('Bootstrap')
            if 'foundation' in response.text.lower():
                technologies.append('Foundation')

            # Look for CMS platforms
            if 'wordpress' in response.text.lower():
                technologies.append('WordPress')
            if 'joomla' in response.text.lower():
                technologies.append('Joomla!')
            if 'drupal' in response.text.lower():
                technologies.append('Drupal')

            # Look for e-commerce platforms
            if 'magento' in response.text.lower():
                technologies.append('Magento')
            if 'shopify' in response.text.lower():
                technologies.append('Shopify')

            # Look for web servers
            if 'nginx' in response.headers.get('server', '').lower():
                technologies.append('nginx')
            if 'apache' in response.headers.get('server', '').lower():
                technologies.append('Apache')

            if technologies:
                webdict.update({"Technologies": technologies})
            else:
                webdict.update({"Info": "No technologies found."})
    except:
        webdict.update(
            {"Info": "An error occurred while trying to fetch the website."})
    print(webdict)
    index = None

    if 'Technologies' in webdict:
        index = list(webdict).index('Technologies')
    lst = []
    lst = list(webdict.values())[1]
    llen = len(lst)
    print(lst)
    resdict = {}
    print(llen)
    chrome_options = Options()

    chrome_options.add_argument("--headless")

    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    try:
        url = "https://nvd.nist.gov/vuln/search"
        driver = webdriver.Chrome(options=chrome_options)
        driver.get(url)

        for i in range(0, llen-1):
            e3 = driver.find_element(By.NAME, 'query').send_keys(lst[i])
            submit = driver.find_element(
                By.XPATH, '//*[@id="vuln-search-submit"]')
            submit.click()
            time.sleep(8)

            for i in range(1, 6):
                submit = driver.find_element(
                    By.XPATH, '//*[@id="row"]/table/tbody/tr[' + str(i) + ']/th/strong/a')

                e = driver.find_element(
                    By.XPATH, '//*[@id="row"]/table/tbody/tr[' + str(i) + ']/td[2]')
                # print(e.text)
                resdict.update({submit.text: e.text})

    except Exception as e:
        print("check spelling bro", e)
    return(resdict)

@app.route('/xxelookup')
def xxelookup():
    xxedict={}
    url = 'https://'+wd
    xml_payload = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT foo ANY><!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>'
    xml_payload = html.escape(xml_payload)

    headers = {
        'Content-Type': 'application/xml',
    }

    response = requests.post(url, headers=headers, data=xml_payload)

    if response.status_code == 200:
        try:
            root = ET.fromstring(response.text)
            # Check for XXE vulnerability by looking for contents of /etc/passwd in the response
            if 'root:x' in response.text:
                xxedict.update({"XXEStatus":"XXE vulnerability found"})
            else:
                xxedict.update({"XXEStatus":"No XXE vulnerability found"})
        except ET.ParseError:
            xxedict.update({"XXEStatus":"Invalid XML response"})

    else:
        xxedict.update({"XXEStatus":response.status_code})
app.run()
