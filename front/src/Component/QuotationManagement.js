import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import dayjs from 'dayjs'
import style from '../mystyle.module.css'

export default function QuotationManagement() {
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [sum, setSum] = useState(0)
  const [productRows, setProductRows] = useState([])

  useEffect(() => {
    handleFetchData()
  }, [])

  const handleFetchData = () => {
    fetch(`${API_URL}/quotation/list`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data
          .sort((a, b) => {
    
            const dateA = new Date(a.created_at)
            const dateB = new Date(b.created_at)
            return dateB - dateA
          })
          .map((e, i) => {

            setSum(val => val += Number.parseFloat(e.totalAmount))
            return (
              <tr key={i}>
                <td>
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e)
                    }}
                  />
                </td>
                <td>{e._id}</td>
                <td>{dayjs(e.created_at).format('YYYY-MM-DD, HH:mm:ss')}</td>
                <td>{e.totalAmount}</td>
              </tr>
            )
          })

        setProductRows(rows)
      })
  }

  const handleDelete = (product) => {
    console.log(product)
    if (window.confirm(`Are you sure to delete [${product.name}]?`)) {
      fetch(`${API_URL}/quotation/${product._id}`, {
        method: 'DELETE',
        mode: 'cors'
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log('DELETE Result', json)
          handleFetchData()
        })
    }
  }

  return (
    <>
      <Container>
        <h1>Quotation Management</h1>
        {/* API_URL: {API_URL} */}
        <Button
          variant='outline-dark'
          onClick={() => {
            navigate('/react=quotation')
          }}
        >
          <FaPlus /> Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>&nbsp;</th>
              <th className={style.textCenter}>Quotation No</th>
              <th className={style.textCenter}>Created At</th>
              <th className={style.textCenter}>Amount</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className={style.textRight}>
                Total
              </td>
              <td className={style.textRight}>{sum}</td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </>
  )
}
