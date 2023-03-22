from flask import Flask, request, jsonify
import dns.resolver

app = Flask(__name__)

@app.route('/dns')
def run_dns():
    arg1 = request.args.get('arg1')
   # arg2 = request.args.get('arg2')
    # Insert code here to run your Python script with the given arguments
    # -*- coding: utf-8 -*-
   # domain=input()
    get_records(arg1)
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
                    #s=rdata.to_text()
        
            except Exception as e:
                pass  # or pass

if __name__ == '__main__':
    run_dns()
   
   # output = 'Hello, {} {}'.format(arg1, arg2)
    #return jsonify({'output': output})
