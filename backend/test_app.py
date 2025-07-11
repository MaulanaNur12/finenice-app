# test_app.py
import unittest
from app import app

class FineniceAPITestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_register_user(self):
        response = self.client.post("/auth/register", json={
            "username": "test_user",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("User registered", response.get_data(as_text=True))

    def test_login_user(self):
        response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.get_data(as_text=True))

    def test_list_products(self):
        response = self.client.get("/products")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)

if __name__ == "__main__":
    unittest.main()
