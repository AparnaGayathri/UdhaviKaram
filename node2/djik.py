import math
import pyttsx3
graph = {
    'a': {'b': 5, 'c': 2},
    'b': {'a': 5, 'c': 7, 'd': 8},
    'c': {'a': 2, 'b': 7, 'd': 4, 'e': 8},
    'd': {'b': 8, 'c': 4, 'e': 6, 'f': 4},
    'e': {'c': 8, 'd': 6, 'f': 3},
    'f': {'e': 3, 'd': 4}
}


def dijkstra(graph, source, destination):
    unvisited = graph
    shortest_distances = {}
    route = []
    path_nodes = {}
    dist = []

    for nodes in unvisited:
        shortest_distances[nodes] = math.inf
    shortest_distances[source] = 0

    while unvisited:
        min_node = None
        for current_node in unvisited:
            if min_node is None:
                min_node = current_node
            elif shortest_distances[min_node] > shortest_distances[current_node]:
                min_node = current_node
        for (node, value) in unvisited[min_node].items():
            if value + shortest_distances[min_node] < shortest_distances[node]:
                shortest_distances[node] = value + shortest_distances[min_node]
                path_nodes[node] = min_node
        unvisited.pop(min_node)

    node = destination

    while node != source:
        try:
            route.insert(0, node)
            node = path_nodes[node]
        except Exception:
            print('Path not reachable')
            break
    route.insert(0, source)

    if shortest_distances[destination] != math.inf:
        say('Shortest distance is ' +
            str(shortest_distances[destination]))
        print('Shortest distance is ' +
              str(shortest_distances[destination]))
        if route is not None:
            say('Starting at {}'.format(source))
            for i in range(len(route) - 1):
                print("Go from {} to {}".format(route[i], route[i+1]))
                say('Go from {} to {}'.format(route[i], route[i+1]))
                print(dist)


engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)


def say(text):
    engine.say(text)
    engine.runAndWait()


say('Where are you starting from? ')
start = input('Where are you starting from? ')
say(start)
say('Where do you want to go? ')
end = input('Where do you want to go? ')
say(end)

dijkstra(graph, start, end)
