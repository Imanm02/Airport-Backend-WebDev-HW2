# Authentication Microservice Performance Testing

## Locust tasks

#### Search Tickets

Use for testing `/flights` API

```py
    @task(3)
    def search_ticket(self):
        # search a ticket
        self.client.get(
            "/flights?origin=ADZ&destination=BTS&departureDate=2023-02-04&returnDate=2023-02-05",
            headers={
                "Authorization": 'JWT access token'
            }
        )
```

---

#### Purchase tickets history

Use for testing `/dashboard/tickets` API

```python
   @task
   def purchase_ticket(self):
        self.client.post("/ticket", json={
            "corresponding_user_id": 1,
            "title": "buying",
            "flight_serial": "23424",
            "offer_price": 110,
            "offer_class": "y"
        })
```

---


## Performance Test

Use **_locust_** tool for testng

#### Single User

Single user sending request with 1 to 4 seconds wait time.


<p><img src="assets/total_requests_per_second_auth.png" alt="total request per second"></p>




