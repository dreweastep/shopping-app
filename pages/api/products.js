import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb();

export default async (req, res) => {
    const { page, size } = req.query

    //Convert querystring values to numbers
    const pageNum = Number(page)
    const pageSize = Number(size)
    let products = [];
    const totalDocs = await Product.countDocuments()
    const totalPages = Math.ceil(totalDocs / pageSize)

    if (pageNum === 1) {
        products = await Product.find()
            .sort({ name: 'asc'})
            .limit(pageSize)
    } else {
        const skips = pageSize * (pageNum - 1)
        products = await Product.find()
            .sort({ name: 'asc'})
            .skip(skips)
            .limit(pageSize)
    }


    res.status(200).json({ products, totalPages });
}