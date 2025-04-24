from http.server import SimpleHTTPRequestHandler, HTTPServer
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading
import time

PORT = 8000

class ReloadHandler(FileSystemEventHandler):
    def __init__(self):
        self.modified = False

    def on_modified(self, event):
        self.modified = True

def start_server():
    handler = SimpleHTTPRequestHandler
    httpd = HTTPServer(('0.0.0.0', PORT), handler)
    print(f"Serving on http://127.0.0.1:{PORT}")
    httpd.serve_forever()

def watch_changes():
    event_handler = ReloadHandler()
    observer = Observer()
    observer.schedule(event_handler, '.', recursive=True)
    observer.start()

    try:
        while True:
            if event_handler.modified:
                print("Files changed. Reloading...")
                event_handler.modified = False
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

# Run server and watcher in parallel
server_thread = threading.Thread(target=start_server)
server_thread.daemon = True
server_thread.start()

watch_changes()
