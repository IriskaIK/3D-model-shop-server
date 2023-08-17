/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "products" CASCADE');

  // Deletes ALL existing entries
  await knex("users").insert([
    {
      first_name: "SomeName",
      last_name : "LastName",
      email : "qwerty@gmail.com",
      phone : "+380502047396"
    },
    { 
    first_name: "Second",
    last_name : "Person",
    email : "oleg@gmail.com",
    phone : "+380609058202"
    },
  ]);

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

  await knex("products").insert([
    {
      title: "product",
      subtitle: "some",
      content : "long description long description long description long description",
      price : '20.99',
      isInStock : true,
      universe_id : 1

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
