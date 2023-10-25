import xmlrpc.server

class RPCGame:
    def play(self, player_choice):
        import random

        choices = ["pedra", "papel", "tesoura"]
        server_choice = random.choice(choices)

        if player_choice == server_choice:
            return "Empatou! " + server_choice
        elif (
            (player_choice == "pedra" and server_choice == "tesoura")
            or (player_choice == "tesoura" and server_choice == "papel")
            or (player_choice == "papel" and server_choice == "pedra")
        ):
            return "Voce ganhou! " + server_choice
        else:
            return "Voce perdeu! " + server_choice

server = xmlrpc.server.SimpleXMLRPCServer(("localhost", 8000))
server.register_instance(RPCGame())
print("O servidor está pronto para jogar.")
server.serve_forever()
