打開網頁：https://x-engineer-001.github.io/2_Player_Upgrade_Shooter/<br>
這是我很早期的作品，幾乎是剛接觸程式語言就憑著自己摸索寫出來的。單機雙人對打，俯視2D角度，看起來很簡陋(我不是美術專才的……)，但驚人的特色如下：<br>
  移動方向與射擊方向獨立互不影響。<br>
  每場遊戲地形完全隨機生成，遊戲可以永無止境地進行下去。<br>
  每場遊戲之間兩個玩家可以升級角色，能選擇的屬性也是隨機生成(每種屬性出現機率不相等)，屬性池如下：<br>
    Attack：攻擊力<br>
    Hp：生命值<br>
    Critical：暴擊傷害倍率<br>
    Shot：每次射擊射出子彈數(會降低每顆子彈傷害，但每次射擊仍然只消耗一顆子彈)<br>
    Absorb：攻擊吸血倍率<br>
    Retort：反彈傷害倍率<br>
    Bullet：最大子彈裝填量(子彈隨時間自動補充)<br>
    \*暴擊、攻擊吸血、反彈傷害的機率皆為1/4，觸發時在畫面上方會有小圖示出現一秒鐘\*<br>
操作方式：<br>
玩家一：<br>
  WSAD鍵控制移動，TGFH鍵控制射擊方向，空白鍵射擊。<br>
玩家二：<br>
  上下左右鍵控制移動，數字鍵盤965+鍵控制射擊方向，數字鍵盤0鍵射擊。<br>
詳細流程：<br>
  遊戲開始直接進入一場槍戰。<br>
  結束後畫面上生成六個屬性圖示，由前一場獲勝玩家優先選擇，<br>
  輪流以滑鼠點選後雙方玩家各升級三個屬性。<br>
  選擇完畢再次進入另一場槍戰，如此重複以上流程。<br>
遊戲畫面相關：<br>
<img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/%E9%9B%99%E4%BA%BA%E6%A7%8D%E6%88%B0%E6%88%AA%E5%9C%96.png" width="500"><br>
藍色、紅色為血量條，黃色為子彈量表。<br>
各屬性圖示：<br>
  Attack  Hp     Critical  Shot    Absorb Retort   Bullet<br>
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/attack.png" width="50">
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/hp.png" width="50">
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/critical.png" width="50">
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/shot.png" width="50">
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/absorb.png" width="50">
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/retort.png" width="50">
  <img src="https://github.com/X-Engineer-001/2_Player_Upgrade_Shooter/blob/gh-pages/images/bullet.png" width="50">
<br>  \*所有圖都是我自己用小畫家……
