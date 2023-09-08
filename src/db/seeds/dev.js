/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "products" CASCADE');

  // Deletes ALL existing entries
  

  await knex('universe').insert([
    {
      title : 'Star Wars',
      content : 'Far away'
    },
    {
      title : 'Warhammer 40K',
      content : 'Ova'
    },
    {
      title : 'Asinus',
      content : 'Asinus'
    },
    {
      title : 'Undaunted',
      content : 'tnk'
    },
    {
      title : 'Withcer',
      content : 'Coin'
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

  await knex("products").insert([
    {
      title: "product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : '20.99',
      isInStock : true,
      universe_id : 1,
      image_id : 1

    },
    {
      title: "expensive product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : '129.99',
      isInStock : true,
      universe_id : 1,
      image_id : 2

    },
    {
      title: "one more expensive product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : '299.99',
      isInStock : true,
      universe_id : 1,
      image_id : 3

    },
    {
      title: "product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : '20.99',
      isInStock : true,
      universe_id : 2

    },
    {
      title: "product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : '20.99',
      isInStock : true,
      universe_id : 3

    }
    
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
};
