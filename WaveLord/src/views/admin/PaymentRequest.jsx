import React, { forwardRef } from "react";
import { FixedSizeList as List} from "react-window";
import '../../scss/admin/PaymentRequest.scss'

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const PaymentRequest = () => {

    const array = [1,2,3,4,5,6,7,8,9,10]

    const Row = ({ index, style }) => {
        
        return (
            <div style={style} className="row-container">

                <div>{index + 1}</div>
                <div>$6528</div>
                <div>
                    <span>Pending</span>
                </div>
                <div>25 Dec 2023</div>
                <div>
                    <button>Confirm</button>
                </div>
                

            </div>
        )
    }







    return (
        <div className="out">
            <div className="container">
                <h2>Withdrawal Request</h2>

                <div>
                    <div>
                        <div className="title">
                            <div>N°</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Date</div>
                            <div> Action</div>
                            
                        </div>

                        {
                            <List
                            style={{ minWidth : '340px'}}
                            className='List'
                            height={350}
                            itemCount={1000}
                            itemSize={35}
                            outerElementType= {outerElementType}
                            >{Row}</List>
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentRequest;