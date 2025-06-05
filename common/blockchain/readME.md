This is an attempt to simulate the Shamir's Secret Sharing Scheme (SSS), where a secret can be unlocked by acquiring a threshold number of keys.
This program (python) accepts a secret number, number of shares(n) and the threshold, then uses the SSS algorithm to find n number of (x,y) pairs.
On user's input of threshold number of x values, the algorithm uses those pairs to give back the secret number. This process uses Lagrange Interpolation.
