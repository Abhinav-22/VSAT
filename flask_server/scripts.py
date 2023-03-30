from flask import Flask
import ssl
import socket
import whois
import dns.resolver

from requests_html import HTMLSession
from bs4 import BeautifulSoup

import requests
import time
import requests
import re
from flask import request
from flask import jsonify
wd="rajagiritech.ac.in"
details = {}


class MyScripts:
    def __init__(self):
        self.app = Flask(__name__)

        @self.app.route('/individual',methods=['GET', 'POST'])
        def script1():
            def get_ssl_whois_info(hostname, domain):
                details.update({'domain_name': domain})
                context = ssl.create_default_context()
                conn = context.wrap_socket(socket.socket(
                    socket.AF_INET), server_hostname=hostname)
                conn.connect((hostname, 443))
                ssl_info = conn.getpeercert()
                details.update({'SSL_details': ssl_info})
                def whoissample():      
                   # wdict={}
                    try:
                        w = whois.whois(wd)
                        details.update({'Whois info':w})
                    except Exception as e:
                        details.update({'Error getting WHOIS':wd})
                #return (wdict) 
                whoissample()
                return details
            hostname = "www.rajagiritech.ac.in"
            domain = "rajagiritech.ac.in"
            ssl_info = get_ssl_whois_info(hostname, domain)
            def gethttps():                
                ur='https://'+wd
                hsd={}
                
                response = requests.get(ur)
                headers = response.headers
                cookies = response.cookies

# XXSS block
                try:
                    if headers["X-XSS-Protection"]:
                        hsd.update({'X-XSS-Protection' :  'pass'})
                except KeyError:
                    hsd.update({'X-XSS-Protection header not present' :  'fail!'})

# NOSNIFF block
                try:
                    if headers["X-Content-Type-Options"].lower() == "nosniff":
                        hsd.update({'X-Content-Type-Options' :  'pass'})
                    else:
                        hsd.update({'X-Content-Type-Options header not set correctly' :  'fail!'})
                except KeyError:
                    hsd.update({'X-Content-Type-Options header not present' :  'fail!'})

# XFrame block
                try:
                    if "deny" in headers["X-Frame-Options"].lower():
                         hsd.update({'X-Frame-Options' :  'pass'})
                    elif "sameorigin" in headers["X-Frame-Options"].lower():
                        hsd.update({'X-Frame-Options' :  'pass'})
                    else:
                        hsd.update({'X-Frame-Options header not set correctly' :  'fail!'})
                except KeyError:
                    hsd.update({'X-Frame-Options header not present' :  'fail!'})

# HSTS block
                try:
                    if headers["Strict-Transport-Security"]:
                        hsd.update({'Strict-Transport-Security' :  'pass'})
                except KeyError:
                    hsd.update({'Strict-Transport-Security header not present' :  'fail!'})

# Policy block
                try:
                    if headers["Content-Security-Policy"]:
                        hsd.update({'Content-Security-Policy' :  'pass'})
                except KeyError:
                    hsd.update({'Content-Security-Policy header not present' :  'fail!'})

# Cookie blocks
                for cookie in cookies:
                    hsd.update({'Set-Cookie' :  ''})
                    if cookie.secure:
                        hsd.update({'Secure' :  'pass'})
                    else:
                        hsd.update({'Secure attribute not set' :  'fail!'})
                    if cookie.has_nonstandard_attr('httponly') or cookie.has_nonstandard_attr('HttpOnly'):
                        hsd.update({'HttpOnly' :  'pass'})
                else:
                    hsd.update({'HttpOnly attribute not set' :  'fail!'})

                details.update({'hhtps':hsd})
                return(hsd)
            gethttps()
            def get_records(domain):

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
                        answers = dns.resolver.resolve(domain, a)
                        for rdata in answers:
                            print(a, ':', rdata.to_text())
                            s = a+' : '+rdata.to_text()
                            list.append(s)
                    except Exception as e:
                        pass  # or pass
            get_records(domain)
            details.update({'DNS Resolution': list})
            return jsonify({'Indiviudal Details': details})
           # return details
        list = []
        enterprise_detail = {}

        @self.app.route('/enterprise',methods=['GET', 'POST'])
        def script2():
            # code for script2
            # domain=input()
            domain = "rajagiritech.ac.in"

            def get_records(domain):

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
                        answers = dns.resolver.resolve(domain, a)
                        for rdata in answers:
                            print(a, ':', rdata.to_text())
                            s = a+' : '+rdata.to_text()
                            list.append(s)
                    except Exception as e:
                        pass  # or pass
            get_records(domain)
            enterprise_detail.update({'DNS Resolution': list})

            # URL Redirection
            url = "https://stackoverflow.com/questions/18713086/virtualenv-wont-activate-on-windows"
            links = []
            session = HTMLSession()
            response = session.get(url)
            soup = BeautifulSoup(response.text, 'lxml')
            for link in soup.find_all('a', href=True):
                if(link['href'].startswith('./')):
                    link['href'] = url + link['href']
                if(link['href'].startswith('/')):
                    link['href'] = url + link['href']
                if(link['href'].startswith('#')):
                    continue
                if(link['href'].startswith('http')):
                    links.append(link['href'])
               
            enterprise_detail.update({'URL Redirection': links})

            # loading time
            start = time.time()
            response = requests.get(
                "https://www.w3schools.com/python/python_casting.asp")
            end = time.time()
            elapsed_time = end - start
            print("Time elapsed: ", elapsed_time)
            enterprise_detail.update(
                {"Time elapsed before loading: ": elapsed_time})

            # web technologies
            weblist = {}

            def get_server_header(url):
                """Returns the server header of a website"""
                try:
                    response = requests.get(url)
                    return response.headers['server']
                except:
                    return None

            def get_web_technologies(url):
                """Returns a list of possible web technologies used by a website"""
                try:
                    response = requests.get(url)
                    technologies = []
                    if 'X-Powered-By' in response.headers:
                        technologies.extend(re.findall(
                            '[\w-]+', response.headers['X-Powered-By']))
                    if 'X-AspNet-Version' in response.headers:
                        technologies.append('ASP.NET')
                    if 'X-Drupal-Cache' in response.headers:
                        technologies.append('Drupal')
                    if 'X-Generator' in response.headers:
                        technologies.extend(re.findall(
                            '[\w-]+', response.headers['X-Generator']))
                    content = response.text
                    if 'react' in content:
                        technologies.append('React')
                    if 'Django' in content:
                        technologies.append('Django')
                    if 'next/static' in content:
                        technologies.append('Next.js')
                    if 'Astro' in content:
                        technologies.append('Astro')
                    if 'wp-' in content:
                        technologies.append('Wordpress')
                    if 'bootstrap' in content:
                        technologies.append('Bootstrap')
                    if 'php' in content:
                        technologies.append('PHP')
                    if 'jquery' in content:
                        technologies.append('JQuery')
                   # return list(set(technologies))
                    if 'jsp' in content:
                        technologies.append('JSP')
                    if 'webpack' in content:
                        technologies.append('Webpack')
                    if 'ghost/' in content:
                        technologies.append('Ghost')
                    return list(set(technologies))

                except:
                    return None

            def main(url):
                server = get_server_header(url)
                technologies = get_web_technologies(url)
                if server:
                    print(f"Server: {server}")
                    # weblist.append(server)
                    weblist.update({'server': server})
                if technologies:
                    print(f"Technologies: {', '.join(technologies)}")
                    #weblist.append(', '.join(technologies))
                    weblist.update({'Technologies': technologies})
                else:
                    print("Could not determine server or technologies.")
                    weblist.update(
                        {'Technology': "Could not determine server or technologies."})

            #url = input("Enter a website URL: ")
            main(url)
            enterprise_detail.update({'Web Technologies': weblist})
            #who is and SSl
            def get_ssl_whois_info(hostname,domain):
                details.update({'domain_name':domain})
                context = ssl.create_default_context()
                conn = context.wrap_socket(socket.socket(socket.AF_INET), server_hostname=hostname)
                conn.connect((hostname, 443))
                ssl_info = conn.getpeercert()
                enterprise_detail.update({'SSL_details':ssl_info})
                
                  #  details.update({'Domain details':'none'})
               # return enterprise_detail
            hostname ="www.rajagiritech.ac.in"
            domain="rajagiritech.ac.in"
            ssl_info = get_ssl_whois_info(hostname,domain)
            def whoissample():      
                wdict={}
                try:
                    w = whois.whois(wd)
                    enterprise_detail.update({'Whois info':w})
                except Exception as e:
                    enterprise_detail.update({'Error getting WHOIS':wd})
                #return (wdict) 
            whoissample()

            # https
            def gethttps():                
                ur='https://'+wd
                hsd={}
                
                response = requests.get(ur)
                headers = response.headers
                cookies = response.cookies

# XXSS block
                try:
                    if headers["X-XSS-Protection"]:
                        hsd.update({'X-XSS-Protection' :  'pass'})
                except KeyError:
                    hsd.update({'X-XSS-Protection header not present' :  'fail!'})

# NOSNIFF block
                try:
                    if headers["X-Content-Type-Options"].lower() == "nosniff":
                        hsd.update({'X-Content-Type-Options' :  'pass'})
                    else:
                        hsd.update({'X-Content-Type-Options header not set correctly' :  'fail!'})
                except KeyError:
                    hsd.update({'X-Content-Type-Options header not present' :  'fail!'})

# XFrame block
                try:
                    if "deny" in headers["X-Frame-Options"].lower():
                         hsd.update({'X-Frame-Options' :  'pass'})
                    elif "sameorigin" in headers["X-Frame-Options"].lower():
                        hsd.update({'X-Frame-Options' :  'pass'})
                    else:
                        hsd.update({'X-Frame-Options header not set correctly' :  'fail!'})
                except KeyError:
                    hsd.update({'X-Frame-Options header not present' :  'fail!'})

# HSTS block
                try:
                    if headers["Strict-Transport-Security"]:
                        hsd.update({'Strict-Transport-Security' :  'pass'})
                except KeyError:
                    hsd.update({'Strict-Transport-Security header not present' :  'fail!'})

# Policy block
                try:
                    if headers["Content-Security-Policy"]:
                        hsd.update({'Content-Security-Policy' :  'pass'})
                except KeyError:
                    hsd.update({'Content-Security-Policy header not present' :  'fail!'})

# Cookie blocks
                for cookie in cookies:
                    hsd.update({'Set-Cookie' :  ''})
                    if cookie.secure:
                        hsd.update({'Secure' :  'pass'})
                    else:
                        hsd.update({'Secure attribute not set' :  'fail!'})
                    if cookie.has_nonstandard_attr('httponly') or cookie.has_nonstandard_attr('HttpOnly'):
                        hsd.update({'HttpOnly' :  'pass'})
                else:
                    hsd.update({'HttpOnly attribute not set' :  'fail!'})

                enterprise_detail.update({'hhtps':hsd})
                return(hsd)
            gethttps()

            return jsonify({'Enterprise Details': enterprise_detail})
            #return enterprise_detail

           # return enterprise_detail

        # ... other routes and scripts ...
              
        @self.app.route('/text')
        def txt():       
            chrome_options = Options()
            a=[]
            url="https://dnstoolbox.io/"


            chrome_options.add_argument("--headless")

            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")

            driver = webdriver.Chrome(options=chrome_options)
            driver.get(url)

            #element = driver.find_element(By.NAME,"recordType")
            #element.setAttribute("value", "TXT")
            #drp.select_by_visible_text('TXT')
            time.sleep(1)
            element = driver.find_element(By.XPATH,'//*[@id="root"]/div[3]/div/div[1]/div/div[3]/div[1]/div/div')

            element.click()   
            time.sleep(4)
            inp = driver.find_element(By.XPATH,'//*[@id="menu-recordType"]/div[3]/ul/li[8]')
            inp.click()

            domain = "rajagiritech.ac.in"
            print("Checking domain : " + domain)
            #e2 = driver.find_element(By.XPATH,'//*[@id="root"]/div[3]/div/div[1]/div/div[3]/div[2]/div/div')
            e3 = driver.find_element(By.NAME,'hostname').send_keys(domain)

            #e2.click()

            submit = driver.find_element(By.XPATH, '//*[@id="root"]/div[3]/div/div[2]/button')
            submit.click()
            time.sleep(5)
            #values = driver.find_elements(By.TAG_NAME, 'li')
            #print(len(values))

            i=1
            try:
                while True:
                    vals = driver.find_element(By.XPATH, '//*[@id="root"]/div[3]/div/div[2]/div/div/div/div[1]/div/div/div[1]/ol/li[' + str(i) + ']')
                    #print(vals.text)
                    a.append(vals.text)
                    i+=1
            except :print("\n\nover")
            return a
        
        @self.app.route('/whois')
        def whoissample():      
            wdict={}
            try:
                w = whois.whois(wd)
                wdict.update({'Whois info':w})
            except Exception as e:
                wdict.update({'Error getting WHOIS':wd})
            return (wdict) 

    def run(self):
        self.app.run(debug=True)


if __name__ == '__main__':
    my_scripts = MyScripts()
    my_scripts.run()
