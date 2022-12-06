const body = JSON.stringify({
  x: 1,
  y: 2,
});

export const fetchSignature = async () => {
  const response = await fetch("/api/signature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return response.json();
};

export const fetchVerification = async (signature) => {
  const response = await fetch("/api/webhook/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-test-signature": signature,
    },
    body,
  });

  return response.json();
};
