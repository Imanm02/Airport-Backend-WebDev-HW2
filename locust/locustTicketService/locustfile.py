from locust import HttpUser, task, between

class TicketUser(HttpUser):
    wait_time = between(1, 4)

    @task(3)
    def search_ticket(self):
        # search a ticket
        self.client.get(
            "/flights?origin=ADZ&destination=BTS&departureDate=2023-02-04&returnDate=2023-02-05",
            headers={
                "Authorization": 'iman token bede'
            }
        )

    @task(1)
    def get_purchased_tickets(self):
        self.client.get(
            '/dashboard/tickets'
        )

    @task(1)
    def purchase_ticket(self):
        self.client.post("/ticket", json={
            "corresponding_user_id": 1,
            "title": "buying",
            "flight_serial": "23424",
            "offer_price": 110,
            "offer_class": "y"
        })