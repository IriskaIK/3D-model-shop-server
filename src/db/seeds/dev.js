/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "products" CASCADE');

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
      title : 'Star Wars',
      content : 'Far away',
      image_id : 1
    },
    {
      title : 'Warhammer 40K',
      content : 'Ova',
      image_id : 2
    },
    {
      title : 'Asinus',
      content : 'Asinus',
      image_id : 3
    },
    {
      title : 'Undaunted',
      content : 'tnk',
      image_id : 1
    },
    {
      title : 'Withcer',
      content : 'Coin',
      image_id : 2
    }
  ])




  await knex("products").insert([
    {
      title: "product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : 20.99,
      isInStock : true,
      category_id : 1,

    },
    {
      title: "expensive product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : 129.99,
      isInStock : true,
      category_id : 1,

    },
    {
      title: "one more expensive product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : 299.99,
      isInStock : true,
      category_id : 1,


    },



  ])

  await knex('tags').insert([
    {
      title : 'first tag',
    },
    {
      title : 'second tag',
    },
    {
      title : 'third tag',
    },
    {
      title : 'more tag',
    }
  ])

  await knex('tag_product').insert([
    {
      product_id : 1,
      tag_id : 1
    },
    {
      product_id : 1,
      tag_id : 2
    },
    {
      product_id : 1,
      tag_id : 3
    },
    {
      product_id : 2,
      tag_id : 2
    },
    {
      product_id : 3,
      tag_id : 1
    },
    {
      product_id : 3,
      tag_id : 4
    }

  ])
  await knex('image_product').insert([
    {
      product_id : 1,
      image_id : 1
    },
    {
      product_id : 1,
      image_id : 2
    },
    {
      product_id : 1,
      image_id : 3
    },
    {
      product_id : 2,
      image_id : 2
    },
    {
      product_id : 3,
      image_id : 1
    },
    {
      product_id : 3,
      image_id : 2
    }

  ])
};
