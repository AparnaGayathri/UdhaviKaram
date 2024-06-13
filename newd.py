import heapq


def dijkstra(graph, start, end):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    queue = [(0, start)]
    while queue:
        current_distance, current_node = heapq.heappop(queue)
        if current_node == end:
            path = []
            while current_node != start:
                path.append(current_node)
                current_node = distances[current_node][1]
            path.append(start)
            return path[::-1]
        if current_distance > distances[current_node]:
            continue
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(queue, (distance, neighbor))
    for node, distance in distances.items():
        print(f"Distance from {start} to {node}: {distance}")
    return None


# Example usage
graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'A': 4, 'D': 3},
    'C': {'A': 2, 'D': 1},
    'D': {'B': 3, 'C': 1, 'E': 5},
    'E': {'D': 5}
}
start = 'A'
end = 'D'
dijkstra(graph, start, end)
