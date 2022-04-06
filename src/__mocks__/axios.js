const mockResponse = {
  data: {
    CustomerRate: 0,
    CustomerAmout: 0,
    Message: "Sorry, we do not transfer from PKR",
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
