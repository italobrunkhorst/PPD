import xmlrpc.client

proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")
player_choice = input("Digite sua escolha (pedra, papel, tesoura): ").lower()

result = proxy.play(player_choice)

print(result)
