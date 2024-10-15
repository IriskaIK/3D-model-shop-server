/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "products" CASCADE');
  await knex.raw('TRUNCATE TABLE "category" CASCADE');
  await knex.raw('TRUNCATE TABLE "tags" CASCADE');
  await knex.raw('TRUNCATE TABLE "images" CASCADE');
  await knex.raw('TRUNCATE TABLE "admins" CASCADE');
  await knex.raw('TRUNCATE TABLE "roles" CASCADE');
  await knex.raw('TRUNCATE TABLE "cities" CASCADE');
  await knex.raw('TRUNCATE TABLE "regions" CASCADE');
  await knex.raw('TRUNCATE TABLE "postOffices" CASCADE');

  // Deletes ALL existing entries


  await knex('roles').insert([
    {
      role: 'admin',
      right_to_edit : true,
      right_to_delete: true,
      right_to_create : true,
      superuser : true
    }
  ])

  await knex('admins').insert([
    {
      first_name : 'Administrator',
      last_name : 'Administrator',
      email : 'admin@administrator.com',
      password: 'admin',
      role_id : 1,
    }
  ])

  await knex("images").insert([

    {
      filename: 'fs',
      path : 'fs.webp'
    },
    {
      filename:'coh',
      path: 'coh.jpg'
    },
    {
      filename : 'undaunted',
      path: 'undaunted.jpg'
    }
  ])

  await knex('category').insert([
    {
      title: 'Star Wars',
      content: 'Far away',
      image_id: 1
    },
    {
      title: 'Warhammer 40K',
      content: 'Ova',
      image_id: 2
    },
    {
      title: 'Asinus',
      content: 'Asinus',
      image_id: 3
    },
    {
      title: 'Undaunted',
      content: 'tnk',
      image_id: 1
    },
    {
      title: 'Witcher',
      content: 'Coin',
      image_id: 2
    },
    {
      title: 'Dune',
      content: 'Desert power',
      image_id: 3
    },
    {
      title: 'Lord of the Rings',
      content: 'Middle-Earth',
      image_id: 1
    }
  ])

  await knex('products').insert([
    {
      title: 'product',
      subtitle: 'some',
      content: 'long description long description long description long description',
      price: 20.99,
      isInStock: true,
      category_id: 1,
      slug: 'product'
    },
    {
      title: 'expensive product',
      subtitle: 'some',
      content: 'long description long description long description long description',
      price: 129.99,
      isInStock: true,
      category_id: 1,
      slug: 'expensive-product'
    },
    {
      title: 'one more expensive product',
      subtitle: 'some',
      content: 'long description long description long description long description',
      price: 299.99,
      isInStock: true,
      category_id: 1,
      slug: 'one-more-expensive-product'
    },
    {
      title: 'budget product',
      subtitle: 'affordable',
      content: 'great value for money',
      price: 9.99,
      isInStock: true,
      category_id: 2,
      slug: 'budget-product'
    },
    {
      title: 'luxury item',
      subtitle: 'premium quality',
      content: 'for those who want the best',
      price: 999.99,
      isInStock: false,
      category_id: 2,
      slug: 'luxury-item'
    },
    {
      title: 'gaming set',
      subtitle: 'ultimate bundle',
      content: 'includes all necessary equipment for gaming',
      price: 199.99,
      isInStock: true,
      category_id: 3,
      slug: 'gaming-set'
    },
    {
      title: 'book collection',
      subtitle: 'classic literature',
      content: 'a collection of timeless classics',
      price: 59.99,
      isInStock: true,
      category_id: 6,
      slug: 'book-collection'
    },
    {
      title: 'toy set',
      subtitle: 'fun for kids',
      content: 'a fun and educational toy set',
      price: 39.99,
      isInStock: true,
      category_id: 7,
      slug: 'toy-set'
    }
  ])

  await knex('tags').insert([
    {
      title: 'first tag'
    },
    {
      title: 'second tag'
    },
    {
      title: 'third tag'
    },
    {
      title: 'more tag'
    },
    {
      title: 'premium'
    },
    {
      title: 'budget'
    },
    {
      title: 'classic'
    },
    {
      title: 'luxury'
    }
  ])

  await knex('tag_product').insert([
    {
      product_id: 1,
      tag_id: 1
    },
    {
      product_id: 1,
      tag_id: 2
    },
    {
      product_id: 1,
      tag_id: 3
    },
    {
      product_id: 2,
      tag_id: 2
    },
    {
      product_id: 3,
      tag_id: 1
    },
    {
      product_id: 3,
      tag_id: 4
    },
    {
      product_id: 4,
      tag_id: 6
    },
    {
      product_id: 5,
      tag_id: 8
    },
    {
      product_id: 6,
      tag_id: 5
    },
    {
      product_id: 7,
      tag_id: 7
    },
    {
      product_id: 8,
      tag_id: 3
    }
  ])

  // Insert data into the 'regions' table
  await knex('regions').insert([
    {
      name: 'North'
    },
    {
      name: 'South'
    },
    {
      name: 'East'
    },
    {
      name: 'West'
    },
    {
      name: 'Central'
    }
  ])

// Insert data into the 'cities' table
  await knex('cities').insert([
    {
      name: 'Winterfell',
      region_id: 1
    },
    {
      name: 'King\'s Landing',
      region_id: 2
    },
    {
      name: 'Braavos',
      region_id: 3
    },
    {
      name: 'Meereen',
      region_id: 4
    },
    {
      name: 'Oldtown',
      region_id: 5
    },
    {
      name: 'Riverrun',
      region_id: 1
    },
    {
      name: 'Dorne',
      region_id: 2
    },
    {
      name: 'Volantis',
      region_id: 3
    }
  ])

// Insert data into the 'postOffices' table
  await knex('postOffices').insert([
    {
      address: '123 Northern Road, Winterfell',
      city_id: 1
    },
    {
      address: '456 Royal Avenue, King\'s Landing',
      city_id: 2
    },
    {
      address: '789 Harbor Lane, Braavos',
      city_id: 3
    },
    {
      address: '101 Sand Street, Meereen',
      city_id: 4
    },
    {
      address: '202 Citadel Way, Oldtown',
      city_id: 5
    },
    {
      address: '303 River Road, Riverrun',
      city_id: 6
    },
    {
      address: '404 Sunspear Boulevard, Dorne',
      city_id: 7
    },
    {
      address: '505 Trade Street, Volantis',
      city_id: 8
    }
  ])


  await knex('image_product').insert([
    {
      product_id: 1,
      image_id: 1
    },
    {
      product_id: 1,
      image_id: 2
    },
    {
      product_id: 1,
      image_id: 3
    },
    {
      product_id: 2,
      image_id: 2
    },
    {
      product_id: 3,
      image_id: 1
    },
    {
      product_id: 3,
      image_id: 2
    },
    {
      product_id: 4,
      image_id: 3
    },
    {
      product_id: 5,
      image_id: 2
    },
    {
      product_id: 6,
      image_id: 1
    },
    {
      product_id: 7,
      image_id: 3
    },
    {
      product_id: 8,
      image_id: 1
    }
  ])

};

