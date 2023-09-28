import requests
import concurrent.futures

# Função para obter informações da Wikipedia para um número específico
def obter_informacoes_wikipedia(numero):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{numero}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        titulo = data["title"]
        resumo = data["extract"]
        return f"Título: {titulo}\nResumo: {resumo}"
    else:
        return f"Erro ao obter informações para {numero}"

# Lista de números da Wikipedia para consultar
numeros = ["1", "2", "3", "4", "5"]

# Usar um executor de threads para consultar em paralelo
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Mapeie as consultas para as threads
    resultados = list(executor.map(obter_informacoes_wikipedia, numeros))

# Imprimir os resultados
for resultado in resultados:
    print(resultado)