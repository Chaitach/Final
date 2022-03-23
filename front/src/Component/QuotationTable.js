import { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'

import style from '../mystyle.module.css'
import { FaTrashAlt } from 'react-icons/fa'

function QuotationTable({ data, clearDataItems, updateDataItems }) {
  // const [dataItems, setDataItems] = useState(data);
  const API_URL = process.env.REACT_APP_API_URL
  const [isLoading, setLoading] = useState(false)
  const [dataRows, setDataRows] = useState()
  const [total, setTotal] = useState(0)
  const [quotationList, setQuotationList] = useState([])

  useEffect(() => {
    const quote = []
    let sum = 0
    const z = data.map((v, i) => {
      let amount = v.qty * v.price
      sum += amount

      const product = {
        name: v.name,
        qty: v.qty,
        price: formatNumber(v.price),
        amount: formatNumber(amount)
      }

      quote.push(product)
      return (
        <tr key={i}>
          <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v.code)} />
          </td>
          <td className={style.textCenter}>{v.qty}</td>
          <td>{v.name}</td>
          <td className={style.textCenter}>{formatNumber(v.price)}</td>
          <td className={style.textRight}>{formatNumber(amount)}</td>
        </tr>
      )
    })

    setQuotationList(quote)
    setDataRows(z)
    setTotal(sum)
  }, [data])

  const deleteItem = (code) => {
    var z = data.filter((value, index, arr) => value.code != code)
    updateDataItems(z)
  }

  const clearTable = () => {
    clearDataItems()
    setDataRows([])
  }

  const postQuotation = () => {
    if (quotationList.length > 0) {
      setLoading(true)
      fetch(`${API_URL}/quotation/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: quotationList, totalAmount: total })
      })
        .then((res) => {
          console.log('Completed POST')
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
            clearDataItems()
          }, 2000)
        })
    }
  }

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div>
      <h1>Quotation</h1>
      <div className='d-flex flex-row justify-content-between mb-2'>
        <Button onClick={clearTable} variant='outline-dark'>
          Clear
        </Button>

        <Button onClick={postQuotation} variant='outline-primary' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '20px' }}>&nbsp;</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>{formatNumber(total)}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}

export default QuotationTable
