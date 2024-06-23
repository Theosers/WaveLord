interface Product {
    category: string;
    rating: number;
    name: string;
    price: number;
}

interface Query {
    category?: string;
    rating?: string;
    searchValue?: string;
    lowPrice?: number;
    highPrice?: number;
    sortPrice?: 'low-to-high' | 'high-to-low';
    pageNumber?: number;
    parPage?: number;
}

class QueryProducts {
    products: Product[] = [];
    query: Query = {};

    constructor(products: Product[], query: Query) {
        this.products = products;
        this.query = query;
    }

    categoryQuery = (): this => {
        this.products = this.query.category ? this.products.filter(c => c.category === this.query.category) : this.products;
        return this;
    }

    ratingQuery = (): this => {
        this.products = this.query.rating ? this.products.filter(c => parseInt(this.query.rating!) <= c.rating && c.rating < parseInt(this.query.rating!) + 1) : this.products;
        return this;
    }

    searchQuery = (): this => {
        this.products = this.query.searchValue ? this.products.filter(p => p.name.toUpperCase().includes(this.query.searchValue!.toUpperCase())) : this.products;
        return this;
    }

    priceQuery = (): this => {
        const lowPrice = this.query.lowPrice ?? 0;
        const highPrice = this.query.highPrice ?? Number.MAX_SAFE_INTEGER;
        this.products = this.products.filter(p => p.price >= lowPrice && p.price <= highPrice);
        return this;
    }

    sortByPrice = (): this => {
        if (this.query.sortPrice) {
            if (this.query.sortPrice === 'low-to-high') {
                this.products = this.products.sort((a, b) => a.price - b.price);
            } else {
                this.products = this.products.sort((a, b) => b.price - a.price);
            }
        }
        return this;
    }

    skip = (): this => {
        const pageNumber = this.query.pageNumber ?? 1;
        const parPage = this.query.parPage ?? this.products.length;
        const skipPage = (pageNumber - 1) * parPage;
        this.products = this.products.slice(skipPage);
        return this;
    }

    limit = (): this => {
        const parPage = this.query.parPage ?? this.products.length;
        this.products = this.products.slice(0, parPage);
        return this;
    }

    getProducts = (): Product[] => {
        return this.products;
    }

    countProducts = (): number => {
        return this.products.length;
    }
}

export default QueryProducts;
