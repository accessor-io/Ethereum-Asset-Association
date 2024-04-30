
import dns.message, dns.query, dns.rdatatype
import json
from web3 import Web3

class DNSProver:
    def __init__(self, send_query):
        self.send_query = send_query

    async def query_with_proof(self, qtype, decoded_name):
        return {
            "proofs": [ {"to_wire": lambda: b'wiredata', "signature": {"data": {"signature": b'signaturedata'}}} ],
            "answer": {"to_wire": lambda: b'answerdata', "signature": {"data": {"signature": b'answersig'}}}
        }

class ServerInstance:
    def __init__(self, server, abi):
        self.server = server()
        self.abi = abi

    async def handle_resolve(self, args):
        name, qtype = args
        decoded_name = dns.name.from_text(dns.message.decode(name).question[0].name.to_text())
        result = await prover.query_with_proof(dns.rdatatype.to_text(qtype), decoded_name)
        ret = [ {"rrset": entry["to_wire"](), "sig": entry["signature"]} for entry in result["proofs"] + [result["answer"]]]
        return [ret]

    def add(self, abi, handlers):
        for handler in handlers:
            setattr(self, handler['type'], self.handle_resolve)

    def make_app(self, path):
        return path
