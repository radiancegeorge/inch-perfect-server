const emailBodyOrder = ({ first_name, reference }) => {
  return `
    <div style="
    font-family: 'Mulish', sans-serif;
    margin: 0;
    padding: 0;
    ">
    <div style="
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(121,119,116, 0.03);
        position: relative;">
        
        <div style="
            max-width: 70%;
            background-color: white;
            padding: 64px;
            border: 0.6px solid rgba(121, 119, 116, 0.24);
            border-radius: 7px;
            ">
            <h2>
                Welcome to Inch Perfect stores
            </h2>
            <p> Hello! ${first_name}
                Your order is Successful and is being processed
            </p>
            <a style="
                display: block;
                margin: auto;
                color: white;
                background: black;
                border: none;
                outline: none;
                padding: 10px 36px;
                border-radius: 7px;
                margin-top: 64px;
                text-decoration: none;"
                href="#">
               Your Order Reference is ${reference}
            </a>
        </div>
        <p style="
            position: absolute;
            bottom: 30px;
            color: #797774;
        ">
            © Inch perfect, Inc. All rights reserved.
        </p>
    </div>
</div>
    
    
    `;
};
module.exports = emailBodyOrder;
