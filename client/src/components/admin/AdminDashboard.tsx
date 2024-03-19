import React, { useState } from 'react';
import "../chat/Admindashboard.css"
const AdminDashboard: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState('Dashboard');
  const handleMenuClick = (content: string) => {
    setSelectedContent(content);
  }
  return (

    <>
      <div className="d-flex flex-lg-row flex-column">
        <div className="chatrounded-r-lg w-full lg:w-[20%] genericBg">
        <div id="adminSideBar" className="d-flex flex-lg-column flex-row my-lg-5 my-4 gap-2 justify-content-center align-items-lg-center align-items-center overflow-auto">


            <div className='bg-gray-600 bg-opacity-20 h-fit w-fit text-center px-5 py-2 rounded-xl' onClick={() => handleMenuClick('Dashboard')}>
              Dashboard
            </div>
            <div className='bg-gray-600 bg-opacity-20 h-fit w-fit text-center px-5 py-2 rounded-xl' onClick={() => handleMenuClick('BuyTokensRequest')}>
              Buy Tokens Requests
            </div>
            <div className='bg-gray-600 bg-opacity-20 h-fit w-fit text-center px-5 py-2 rounded-xl' onClick={() => handleMenuClick('SellTokensRequest')}>
              Sell Requests
            </div>
            <div className='bg-gray-600 bg-opacity-20 h-fit w-fit text-center px-5 py-2 rounded-xl' onClick={() => handleMenuClick('Chats')}>
              Chats
            </div>
            <div className='bg-gray-600 bg-opacity-20 h-fit w-fit text-center px-5 py-2 rounded-xl' onClick={() => handleMenuClick('')}>
              Metamask
            </div>



          </div>

        </div>
        <div className=" w-full lg:w-[80%]">

          {selectedContent === 'Dashboard' && (
            <>
              {/* call dash bord componet */}
            </>
          )}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod natus adipisci laudantium deserunt minus deleniti perspiciatis animi officia cupiditate vero mollitia, eaque modi quasi asperiores aperiam magni labore amet. Quae?
          Earum ut doloribus adipisci quas qui! Ad consequatur ratione voluptates expedita facilis, debitis itaque corporis voluptas ex natus quaerat commodi reprehenderit hic eaque illo consequuntur dignissimos earum quidem! Dolorum, amet?
          Iusto ex, quae quidem maxime hic incidunt sunt blanditiis porro facilis perferendis harum quas ratione, fugiat repellat delectus pariatur quia maiores obcaecati facere unde? Minus asperiores saepe excepturi eos natus.
          Illo veniam nemo itaque nihil! Sapiente architecto, temporibus quidem similique atque non nihil porro? Hic error quibusdam expedita nostrum assumenda veritatis doloribus officia odit! Obcaecati nostrum libero minima ipsa reiciendis.
          Nam ad accusamus ipsam ducimus, debitis libero delectus aperiam molestiae nostrum quo vitae soluta cupiditate modi unde nemo temporibus aliquam adipisci alias perspiciatis eaque sequi laboriosam neque excepturi esse! Dolor!
          Facere error, debitis id veniam atque quia voluptatum iste nostrum magnam voluptates necessitatibus explicabo omnis unde praesentium voluptatibus saepe minima adipisci excepturi inventore doloribus! Quam eos quaerat officiis impedit optio.
          Pariatur debitis recusandae deserunt, ipsam a animi vero consequatur alias facere nam similique magnam excepturi esse quis nostrum velit ratione aperiam? Consectetur ipsam commodi earum. Est enim laudantium autem ipsum?
          Reiciendis ullam libero qui numquam, accusantium eligendi minima? Quo aperiam perspiciatis minus odit quibusdam obcaecati delectus nihil iste at provident totam, culpa dolor fugit beatae explicabo qui nesciunt dignissimos nam?
          Fugit voluptates rem quae delectus ducimus? Accusamus, omnis illo. Exercitationem quae vero commodi esse iste, quisquam voluptas corporis animi perferendis dolorum reiciendis aperiam, assumenda eius alias aliquid. Quibusdam, provident voluptas.
          Optio sunt ipsa ipsum repudiandae aut quasi consectetur ex maiores? Quis soluta sunt nostrum numquam corrupti repellat velit, facilis est accusamus consequatur vero, maxime quidem quod porro dolores, aspernatur doloribus!
          Inventore perferendis itaque, quas totam necessitatibus est odit amet fugit numquam voluptates placeat corporis perspiciatis officia deserunt consequatur quisquam, repellendus beatae blanditiis eos autem, laboriosam expedita architecto soluta! Illum, delectus.
          Eos, libero veniam dolor minus dolore aut eius amet temporibus a asperiores, magni rerum et quisquam aliquam modi ad illo obcaecati delectus molestias esse repudiandae assumenda quod provident! Tenetur, iste.
          Quia odio maiores tenetur! Dolore corporis similique praesentium aut quis non dicta possimus, numquam ut? Consequatur corporis repellendus consequuntur dolorum officiis in doloribus. Quos, in itaque obcaecati harum voluptatum temporibus!
          Quo voluptatibus repellat quae veritatis impedit non deleniti numquam distinctio fuga illo, obcaecati magnam fugiat labore dolorum aperiam. Ad nesciunt, asperiores tempore enim recusandae sit assumenda eaque sint saepe dolore?
          Error illum voluptate, omnis similique eum cumque neque eligendi quibusdam provident blanditiis. Sapiente consectetur debitis obcaecati sint at temporibus placeat, ut voluptates? Error consectetur itaque id expedita modi. Quisquam, molestiae.
          Asperiores possimus, ad perspiciatis ipsa molestiae at vero facere eaque, ullam quam iusto laborum, laboriosam facilis? Nihil facere, alias eaque laudantium ipsa aperiam. Reprehenderit ipsam eum labore, iste facere earum!
          In facilis, porro ex incidunt consectetur voluptatum vel facere repellat consequuntur rerum harum iusto hic placeat delectus praesentium, modi ipsam pariatur. Cumque, eaque iusto! Quaerat qui consectetur rerum laborum et?
          Pariatur qui exercitationem eligendi est libero ex quos repellendus rem ad magni, quo incidunt architecto dolores. Repudiandae quia blanditiis, cupiditate quasi ut in! Voluptas similique fugiat veritatis voluptatibus, perferendis aliquam!
          Pariatur distinctio nisi accusantium velit enim nulla sunt necessitatibus, consequatur, a adipisci quia magni sapiente. Repellat voluptatem saepe corrupti magnam corporis laudantium illo, quia inventore veritatis earum. Aliquid, quas quae?
          Maxime, dolorem! Sit temporibus adipisci nam totam nostrum ad maxime, cumque harum obcaecati officia ipsum quibusdam. Est nulla nostrum, eaque corrupti veritatis officia illum, iusto incidunt, quos exercitationem dolorum placeat.
          Consequuntur perferendis nemo rem earum fuga et maiores ducimus asperiores cumque aperiam in temporibus, nobis a sequi ipsa adipisci delectus tenetur vitae impedit qui suscipit dicta ea velit officiis? Recusandae!
          Odit, voluptas unde? Aliquam deleniti perferendis, ut maiores asperiores autem quisquam optio temporibus explicabo qui voluptatibus ex ipsam atque sapiente? Tenetur quis, laudantium eum sint sunt atque error voluptatem dicta?
          Quisquam illum autem temporibus magni aperiam dolorem voluptate doloremque obcaecati dolorum beatae! Facere accusantium commodi sunt blanditiis mollitia, iure earum sapiente placeat sed dolores, velit nisi aliquam natus incidunt assumenda.
          At reiciendis, nesciunt iusto eaque qui saepe expedita provident rem molestias. Eius molestiae ratione quae eum laboriosam error excepturi quibusdam similique praesentium unde assumenda esse, porro suscipit ipsam, consectetur rem.
          Optio distinctio quisquam qui aperiam ab porro sit nulla, quas, esse ex recusandae! Iure excepturi omnis beatae quo! Perferendis similique fugiat totam repellendus minima dolores excepturi culpa? Voluptas, at autem.
          Deleniti doloribus modi quaerat repellendus a at dolor accusantium blanditiis neque quo unde eligendi illo, perspiciatis architecto recusandae eum dicta alias molestias doloremque ea fugiat ducimus eos cupiditate iusto? Obcaecati!
          Saepe, corrupti optio? Nemo consequatur ratione autem placeat? Quia eum possimus hic aliquam ea. Consequuntur esse officiis incidunt expedita placeat cumque fugit perspiciatis illum voluptatibus ea, corporis eveniet neque aliquam.
          Quis, eligendi. Maiores aspernatur nulla odio saepe minima repellat iste suscipit modi quo, esse reiciendis officia incidunt voluptate expedita facere veniam accusamus? Delectus eum quidem fugiat ut similique incidunt sequi?
          Numquam, eligendi nisi obcaecati quae totam perferendis ipsum illum consectetur quis quam. Doloribus sint ratione laboriosam ipsam blanditiis placeat repellendus nisi facilis perspiciatis, incidunt ad deserunt amet nostrum, iure reprehenderit.
          Veritatis voluptas nam praesentium iure eveniet ipsum voluptatibus vitae facilis aspernatur, id adipisci, omnis nostrum rem deserunt nesciunt accusamus eligendi enim reiciendis. Nemo dignissimos est eius. Autem neque eos quidem?
          Sit repudiandae iste delectus consequuntur soluta mollitia provident hic laboriosam nulla ullam nostrum esse maxime rerum neque amet eligendi ratione, fuga eius consectetur, facilis vel. Ullam cupiditate illum eum incidunt?
          Magni, facere enim? Assumenda saepe itaque praesentium. Ipsa, obcaecati blanditiis cupiditate distinctio laboriosam dicta fugiat, nobis minus aliquid odit debitis libero consequatur. Magni rem natus aspernatur minima aliquam ratione repudiandae.
          Sed nobis eveniet nemo error soluta corporis aliquam suscipit dolorem quaerat ipsam porro facere officiis, ipsum distinctio odio minima eligendi, totam repellendus. Qui, tempora consectetur impedit magnam aut voluptatum repudiandae.
          Error numquam dolor laboriosam quidem reprehenderit commodi assumenda, aliquid quae architecto quos minus libero? Sapiente quasi cum, debitis nisi perspiciatis ea quia autem delectus tenetur! Voluptatibus obcaecati reiciendis in nihil?
          Quaerat, officiis earum fuga, id incidunt sunt placeat fugit veritatis quasi quod molestias assumenda eum nostrum amet sed ipsam veniam temporibus beatae, quae cupiditate eos? At repellendus explicabo sunt minima.
          Aperiam architecto asperiores, soluta voluptatibus consequatur nisi ea maxime adipisci pariatur commodi iure iusto ad eveniet quas harum ut tempora cumque, suscipit, libero error. Quia porro a maiores enim recusandae.
          Consectetur suscipit voluptate totam amet corrupti quisquam nesciunt obcaecati ipsum assumenda molestiae soluta maxime nostrum officia dignissimos esse, cumque qui vero autem recusandae. Adipisci blanditiis fugiat esse ipsa voluptates velit!
          Perspiciatis magnam obcaecati esse natus in iure quasi voluptates repudiandae expedita? Optio numquam est delectus, nesciunt provident molestias quis pariatur, exercitationem sint vero, fuga voluptas sequi consectetur ab! Corrupti, placeat.
          Natus ab optio, quo excepturi ipsum vel libero dolor consectetur suscipit deserunt, dolore ducimus maxime saepe sequi dolores est autem, quaerat magni fugiat iusto aliquid consequatur nulla! Nemo, eum provident!
          Non, atque quaerat repellat, ex ullam impedit ad ea numquam et neque odit sit! Dolores asperiores expedita iste numquam ut, ipsa inventore fugit enim accusamus praesentium, eos laudantium nemo distinctio?
          Aut quam quia illo porro corrupti minus assumenda quaerat blanditiis possimus nostrum, dolore quo doloremque reprehenderit animi explicabo maxime illum recusandae, in odio. Deleniti animi explicabo in ex hic obcaecati!
          Culpa dolorem esse rerum animi officia? Laudantium enim inventore atque repellat veniam earum velit dolor nam quidem quasi quam iusto blanditiis, sunt nobis non possimus consectetur sint pariatur vitae. Maxime?
          Blanditiis doloribus, error illum, earum neque itaque nostrum assumenda nulla praesentium placeat est perferendis natus deserunt culpa eaque pariatur odio! Sapiente sed impedit dolorum ex necessitatibus quo laboriosam nulla accusantium.
          Dolorum, a reprehenderit ut saepe dolor voluptatibus quod corporis, itaque delectus, soluta commodi laudantium suscipit explicabo error adipisci quisquam! Ratione dolor omnis laudantium facilis fugit tempore expedita fugiat, voluptatem rerum?
          Architecto explicabo nulla deserunt odio consectetur debitis at quaerat numquam rem optio, et, aperiam aut nostrum quidem recusandae! Aut fuga modi ut magni unde maxime distinctio sed consequatur quam quod!
          Nisi ex adipisci reiciendis ipsam ipsum, sit architecto perferendis pariatur at dolorem dolorum id consequatur repellat ab maxime qui provident. Ex eligendi adipisci ullam porro eum dolores cumque. Cumque, veritatis.
          Ex corporis deserunt quia maiores necessitatibus illo ea consectetur velit modi facere! Accusantium sapiente eius vel, necessitatibus amet fuga esse consequatur quaerat laboriosam laborum. Et ipsam nemo repudiandae eveniet qui?
          Amet, deserunt iste! Error mollitia officiis veniam rem est temporibus! Mollitia numquam sapiente error dolores unde facere quos adipisci asperiores, incidunt laudantium debitis quidem magnam sequi quam ad corrupti accusantium.
          Et sunt quaerat rem alias culpa totam consequuntur minima ut ad voluptatem, adipisci itaque nisi numquam molestias voluptate exercitationem necessitatibus accusantium hic, eaque sapiente cum atque harum? Distinctio, magni ducimus?
          Corrupti ratione dignissimos similique libero possimus alias quis sint? Quas architecto velit similique deserunt aliquid veniam ipsa nam hic praesentium rerum vel dolores saepe laborum quibusdam animi, ducimus, odit repellendus.
        </div>
      </div>


















    </>
  );
};
export default AdminDashboard;
