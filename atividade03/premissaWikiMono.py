import requests
import concurrent.futures

import requests

def obter_informacoes_wikipedia(numero):
    # URL da API da Wikipedia em inglês
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{numero}"

    # Faz uma consulta HTTP GET
    response = requests.get(url)

    # Verifica se a resposta foi bem-sucedida (código de status HTTP 200)
    if response.status_code == 200:
        # Converte a resposta JSON em um dicionário Python
        data = response.json()
        # Extrai informações relevantes, como o título e o resumo
        titulo = data["title"]
        resumo = data["extract"]
        return f"Título: {titulo}\nResumo: {resumo}"
    else:
        return "Erro ao obter informações da Wikipedia."

# Número para consultar na Wikipedia
numero = "1"  # Você pode substituir isso pelo número desejado

# Chama a função para obter informações
informacoes = obter_informacoes_wikipedia(numero)

# Imprime as informações
print(informacoes)
