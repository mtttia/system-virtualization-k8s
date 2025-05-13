from locust import HttpUser, task, between

class StressTestUser(HttpUser):
    wait_time = between(1, 1)  # optional delay between requests

    @task
    def stress_route(self):
        self.client.get("/")
