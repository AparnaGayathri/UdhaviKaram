import sys
import heapq
import pyttsx3
graph = {
    'Entrance' :{'j1': 20, 'Emergency': 50},
    'j1': {'Out patient ward': 10},
    'Out patient ward': {'Operation theater': 20},
    'Operation theater': {'ICU': 15},
    'ICU': {'j2': 5},
    'j2':{'j3':10},
    'j3':{"Emergency ward"}
}


def dijkstra(graph, start, end):
    inf = sys.maxsize
    node_data = {'Entrance': {'cost': inf, 'pred': []},
                 'j1': {'cost': inf, 'pred': []},
                 'Out patient ward': {'cost': inf, 'pred': []},
                 'Operation theater': {'cost': inf, 'pred': []},
                 'ICU': {'cost': inf, 'pred': []},
                 'j3': {'cost': inf, 'pred': []}
                 }
    node_data[start]['cost'] = 0
    visited = []
    temp = start
    for i in range(5):
        if temp not in visited:
            visited.append(temp)
            min_heap = []
            for j in graph[temp]:
                if j not in visited:
                    cost = node_data[temp]['cost'] + graph[temp][j]
                    if (cost < node_data[j]['cost']):
                        node_data[j]['cost'] = cost
                        node_data[j]['pred'] = node_data[temp]['pred'] + \
                            list(temp)
                    heapq.heappush(min_heap, (node_data[j]['cost'], j))
        heapq.heapify(min_heap)
        temp = min_heap[0][1]
    print("Shortest Distance: " + str(node_data[end]['cost']))
    print("Shortest path: "+str(node_data[end]['pred'] + list(end)))

