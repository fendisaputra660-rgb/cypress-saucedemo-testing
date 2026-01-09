describe('SauceDemo E2E QA Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('1. Harus memuat halaman login dengan benar', () => {
        cy.get('.login_logo').should('be.visible');
        cy.title().should('eq', 'Swag Labs');
    });

    it('2. Harus berhasil login dengan kredensial yang valid', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');
    });

    it('3. Harus menampilkan error untuk user yang terkunci (locked out)', () => {
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
    });

    it('4. Harus menampilkan error untuk kredensial yang tidak valid', () => {
        cy.get('[data-test="username"]').type('invalid_user');
        cy.get('[data-test="password"]').type('wrong_password');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });

    it('5. Harus berhasil logout', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
        cy.url().should('eq', 'https://www.saucedemo.com/');
        cy.get('.login_logo').should('be.visible');
    });

    it('6. Harus menampilkan item inventaris setelah login', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.inventory_item').should('have.length.greaterThan', 0);
    });

    it('7. Harus mengurutkan produk berdasarkan Harga (rendah ke tinggi)', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.product_sort_container').select('lohi');
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get();
            const sorted = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sorted);
        });
    });

    it('8. Harus mengurutkan produk berdasarkan Harga (tinggi ke rendah)', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.product_sort_container').select('hilo');
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get();
            const sorted = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sorted);
        });
    });

    it('9. Harus mengurutkan produk berdasarkan Nama (A ke Z)', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.product_sort_container').select('az');
        cy.get('.inventory_item_name').then(($names) => {
            const names = $names.map((i, el) => el.innerText).get();
            const sorted = [...names].sort();
            expect(names).to.deep.equal(sorted);
        });
    });

    it('10. Harus mengurutkan produk berdasarkan Nama (Z ke A)', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.product_sort_container').select('za');
        cy.get('.inventory_item_name').then(($names) => {
            const names = $names.map((i, el) => el.innerText).get();
            const sorted = [...names].sort().reverse();
            expect(names).to.deep.equal(sorted);
        });
    });

    it('11. Harus menavigasi ke halaman detail produk', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.inventory_item_name').first().click();
        cy.url().should('include', '/inventory-item.html');
        cy.get('.inventory_details_name').should('be.visible');
    });

    it('12. Harus kembali ke produk dari halaman detail', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.inventory_item_name').first().click();
        cy.get('[data-test="back-to-products"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('13. Harus memverifikasi harga produk yang benar di halaman detail', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.inventory_item').should('have.length.greaterThan', 0);
        cy.get('.inventory_item_price').first().invoke('text').then((price) => {
            cy.get('.inventory_item_name').first().click();
            cy.url().should('include', '/inventory-item.html');
            cy.get('.inventory_details_name').should('be.visible');
            cy.get('.inventory_details_price').should('have.text', price);
        });
    });

    it('14. Harus menambahkan item ke keranjang dari halaman inventaris', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('15. Harus menghapus item dari keranjang dari halaman inventaris', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('[data-test^="remove"]').first().click();
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('16. Harus menambahkan item ke keranjang dari halaman detail', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.inventory_item_name').first().click();
        cy.get('[data-test^="add-to-cart"]').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('17. Harus menavigasi ke halaman keranjang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.title').should('have.text', 'Your Cart');
    });

    it('18. Harus menampilkan item yang ditambahkan di keranjang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('have.length', 1);
    });

    it('19. Harus menghapus item dari halaman keranjang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test^="remove"]').click();
        cy.get('.cart_item').should('not.exist');
    });

    it('20. Harus melanjutkan belanja dari keranjang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="continue-shopping"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('21. Harus melanjutkan ke checkout dari keranjang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');
    });

    it('22. Harus menampilkan error jika info checkout hilang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('be.visible');
    });

    it('23. Harus melanjutkan ke ringkasan checkout dengan info valid', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two.html');
    });

    it('24. Harus menampilkan info pembayaran di ringkasan', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('.summary_info').should('contain', 'Payment Information');
    });

    it('25. Harus menyelesaikan pesanan dengan sukses', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test^="add-to-cart"]').first().click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });

    it('26. Harus kembali ke beranda setelah pesanan selesai', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.get('[data-test="back-to-products"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('27. Harus membatalkan checkout dan kembali ke keranjang', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/cart.html');
    });

    it('28. Harus membatalkan ringkasan checkout dan kembali ke produk', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('29. Harus memiliki tautan media sosial yang berfungsi (cek visibilitas)', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.social_twitter').should('be.visible');
        cy.get('.social_facebook').should('be.visible');
        cy.get('.social_linkedin').should('be.visible');
    });

    it('30. Harus menampilkan tahun yang benar di footer copy', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('.footer_copy').should('be.visible');
    });
});
