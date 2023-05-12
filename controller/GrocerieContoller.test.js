const {
  getGroceries,
  deleteGroceries,
  createGroceries,
  deleteGroceriesBulk,
} = require("./GrocerieController");

const Grosserie = require("../db/Grosserie");
const { default: mongoose } = require("mongoose");

jest.mock("../db/Grosserie");

describe("groceries", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getGroceries", () => {
    it("should return all groceries", async () => {
      const mockResult = [
        {
          _id: "someid",
          name: "Apples",
          createdBy: "1234",
          checked: false,
          quantaty: 0,
          createdDate: mongoose.now(),
          listId: "",
        },
        {
          _id: "someid2",
          name: "Bananas",
          createdBy: "1234",
          checked: false,
          quantaty: 0,
          createdDate: mongoose.now(),
          listId: "",
        },
      ];
      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Grosserie.find.mockImplementationOnce((query, callback) => {
        callback(null, mockResult);
      });

      await getGroceries(req, res);

      expect(Grosserie.find).toHaveBeenCalledWith({}, expect.any(Function));
      expect(res.send).toHaveBeenCalledWith(mockResult);
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      const req = {};
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Grosserie.find.mockImplementationOnce((query, callback) => {
        callback(error);
      });

      await getGroceries(req, res);

      expect(Grosserie.find).toHaveBeenCalledWith({}, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteGroceries", () => {
    it("should delete a grocery", async () => {
      const req = { params: { id: "123" } };
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockResult = { n: 1, ok: 1 };

      Grosserie.deleteOne.mockImplementationOnce((query, callback) => {
        callback(null, mockResult);
      });

      await deleteGroceries(req, res);

      expect(Grosserie.deleteOne).toHaveBeenCalledWith(
        { _id: "123" },
        expect.any(Function)
      );
      expect(res.send).toHaveBeenCalledWith(mockResult);
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      const req = { params: { id: "123" } };
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Grosserie.deleteOne.mockImplementationOnce((query, callback) => {
        callback(error);
      });

      await deleteGroceries(req, res);

      expect(Grosserie.deleteOne).toHaveBeenCalledWith(
        { _id: "123" },
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.status().send).toHaveBeenCalledWith(error);
    });
  });

  describe("createGroceries", () => {
    // Define a mock request and response object for each test
    let req;
    let res;

    beforeEach(() => {
      req = {
        body: {
          name: "Apples",
          checked: false,
          quantaty: 0,
          createdBy: "1234",
          listId: "",
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new Grosserie object and send it as the response", async () => {
      const saveSpy = jest.spyOn(Grosserie.prototype, "save");
      const expectedGrosserie = {
        _id: "someid",
        name: "Apples",
        createdBy: "1234",
        checked: false,
        quantaty: 0,
        createdDate: mongoose.now(),
        listId: "",
      };
      saveSpy.mockResolvedValueOnce(expectedGrosserie);

      await createGroceries(req, res);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(expectedGrosserie);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith();
    });

    it("should handle errors and return a 500 error response", async () => {
      const saveSpy = jest.spyOn(Grosserie.prototype, "save");
      const expectedError = new Error("Test error");
      saveSpy.mockRejectedValueOnce(expectedError);

      await createGroceries(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expectedError);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith();
    });
  });

  describe("deleteGroceriesBulk", () => {
    const req = {
      body: {
        ids: ["id1", "id2", "id3"],
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should delete multiple items when ids are provided", async () => {
      const mockDeleteMany = jest.fn((query, callback) => {
        callback(null, "success");
      });

      Grosserie.deleteMany.mockImplementationOnce(mockDeleteMany);

      await deleteGroceriesBulk(req, res);

      expect(mockDeleteMany).toHaveBeenCalledWith(
        { _id: { $in: ["id1", "id2", "id3"] } },
        expect.any(Function)
      );
      expect(res.send).toHaveBeenCalledWith("success");
    });

    it("should send an error response if deleteMany() returns an error", async () => {
      const mockError = new Error("Delete error");
      const mockDeleteMany = jest.fn((query, callback) => {
        callback(mockError, null);
      });

      Grosserie.deleteMany.mockImplementationOnce(mockDeleteMany);

      await deleteGroceriesBulk(req, res);

      expect(mockDeleteMany).toHaveBeenCalledWith(
        { _id: { $in: ["id1", "id2", "id3"] } },
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
