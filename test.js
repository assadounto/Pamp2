c
  const obj1 = { "email": "Assadohountoriko@gmail.com", "password": "123456", "phone": "0556255233", "username": "Gmmj" };
  const obj2 = { "email": "assadohountoriko@gmail.com", "password": "123456", "phone": "0556255233", "username": "gmmj" };
  
  const result = areObjectsEqual(obj1, obj2);
  console.log(result); // Should log true if objects are equal (case-insensitive)
  