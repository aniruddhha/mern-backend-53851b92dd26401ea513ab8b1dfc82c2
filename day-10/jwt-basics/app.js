
const jwt = require('jsonwebtoken')

const token = jwt.sign(
    { role : 'admin' }, 
    'abc123', 
    {  algorithm : 'HS256' }
)

console.log(`🪧 Signed Token`)
console.log(token)

try {
    const original = jwt.verify(token)
    console.log(`✅ Verified`)
    console.log(original)
} catch (error) {
    console.log(`❌ Invalid Signature`)
}


