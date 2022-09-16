
import { ProductStore } from "../products";


const store = new ProductStore();


it('should contain product index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should contain product show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should contain product create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a new product ', async () => {
    const result = await store.create({
        productname:"It ends with us",
        productprice:150,
        productcategory:"Books"
    });
    expect(result).toEqual({
        id: 1, 
        productname:"It ends with us",
        productprice:150,
        productcategory:"Books"
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        id: 1,
        productname:"It ends with us",
        productprice:150,
        productcategory:"Books"
    }]);
  })

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        id: 1,
        productname:"It ends with us",
        productprice:150,
        productcategory:"Books"
    });
  });
