import concurrent.futures

# Função que realiza uma tarefa demorada
def some_heavy_computation():
    result = 0
    for i in range(1000000):
        result += i
    return result

# Função que será executada em uma thread
def worker_function():
    result = some_heavy_computation()
    return result

# Cria um executor de threads
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    # Inicia as threads e obtém as Futures que representam o resultado de cada thread
    futures = [executor.submit(worker_function) for _ in range(4)]

    # Aguarde a conclusão de todas as Futures (threads)
    concurrent.futures.wait(futures)

    # Obtenha os resultados das threads
    results = [future.result() for future in futures]

    # Manipule os resultados
    print("Resultados das threads:", results)