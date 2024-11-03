import React, { useState } from 'react'
import './InsertRecipe.scss';

const InsertRecipe = () => {

  const ckKindList = []
  const [CkKind, setCkKind] = useState("");







  return (
    <div>
      <div>레시피 등록</div>
      <span>레시피 제목</span><input type="text" name="RCP_TTL"></input>
      <br/>
      <span>요리 소개</span><input type="text" name="CK-INFO"></input>
      <br/>
      <span>동영상</span><input type="text" name="recipe_vedio"></input>
      <br/>
      <span>카테고리</span> 
      <select value="종류별">
        <option value="1">밑반찬</option>
        <option value="1">메인반찬</option>

      </select>

    </div>
  )
}

export default InsertRecipe