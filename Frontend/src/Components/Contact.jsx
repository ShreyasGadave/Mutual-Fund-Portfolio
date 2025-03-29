import React from 'react'

const Contact = () => {
  return (
    <div id='Contact'> 
      <section className="flex flex-col items-center text-center py-10 px-4 cursor-pointer">

      {/* Heading */}
      <h2 className="text-5xl font-bold mt-4 ">Get in Touch</h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-lg">
  Want to chat? Just shoot me a DM{" "}
  <a
    href="https://wa.me/7028934703"
    className="text-green-500 mx-1 "
    target="_blank"
    rel="noopener noreferrer"
  >
     me on WhatsApp
  </a>
  and I'll respond whenever I can. I will ignore all soliciting.
</p>

    </section>
</div>
  )
}

export default Contact