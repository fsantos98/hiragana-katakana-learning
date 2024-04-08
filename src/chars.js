import audio_a from './mp3/a.mp3';
import audio_i from './mp3/i.mp3';
import audio_u from './mp3/u.mp3';
import audio_e from './mp3/e.mp3';
import audio_o from './mp3/o.mp3';
import audio_ka from './mp3/ka.mp3';
import audio_ki from './mp3/ki.mp3';
import audio_ku from './mp3/ku.mp3';
import audio_ke from './mp3/ke.mp3';
import audio_ko from './mp3/ko.mp3';
import audio_sa from './mp3/sa.mp3';
import audio_shi from './mp3/shi.mp3';
import audio_su from './mp3/su.mp3';
import audio_se from './mp3/se.mp3';
import audio_so from './mp3/se.mp3';
import audio_ta from './mp3/ta.mp3';
import audio_chi from './mp3/chi.mp3';
import audio_tsu from './mp3/tsu.mp3';
import audio_te from './mp3/te.mp3';
import audio_to from './mp3/to.mp3';
import audio_na from './mp3/na.mp3';
import audio_ni from './mp3/ni.mp3';
import audio_nu from './mp3/nu.mp3';
import audio_ne from './mp3/ne.mp3';
import audio_no from './mp3/no.mp3';
import audio_ha from './mp3/ha.mp3';
import audio_hi from './mp3/hi.mp3';
import audio_fu from './mp3/fu.mp3';
import audio_he from './mp3/he.mp3';
import audio_ho from './mp3/ho.mp3';
import audio_ma from './mp3/ma.mp3';
import audio_mi from './mp3/mi.mp3';
import audio_mu from './mp3/mu.mp3';
import audio_me from './mp3/me.mp3';
import audio_mo from './mp3/mo.mp3';
import audio_ya from './mp3/ya.mp3';
import audio_yu from './mp3/yu.mp3';
import audio_yo from './mp3/yo.mp3';
import audio_ra from './mp3/ra.mp3';
import audio_ri from './mp3/ri.mp3';
import audio_ru from './mp3/ru.mp3';
import audio_re from './mp3/re.mp3';
import audio_ro from './mp3/ro.mp3';
import audio_wa from './mp3/wa.mp3';
import audio_wo from './mp3/wo.mp3';
import audio_n from './mp3/n.mp3';
import audio_ga from './mp3/ga.mp3';
import audio_gi from './mp3/gi.mp3';
import audio_gu from './mp3/gu.mp3';
import audio_ge from './mp3/ge.mp3';
import audio_go from './mp3/go.mp3';
import audio_za from './mp3/za.mp3';
import audio_ji from './mp3/ji.mp3';
import audio_zu from './mp3/zu.mp3';
import audio_ze from './mp3/ze.mp3';
import audio_zo from './mp3/zo.mp3';
import audio_da from './mp3/da.mp3';
import audio_dji from './mp3/dji.mp3';
import audio_dzu from './mp3/dzu.mp3';
import audio_de from './mp3/de.mp3';
import audio_do from './mp3/do.mp3';
import audio_ba from './mp3/ba.mp3';
import audio_bi from './mp3/bi.mp3';
import audio_bu from './mp3/bu.mp3';
import audio_be from './mp3/be.mp3';
import audio_bo from './mp3/bo.mp3';
import audio_pa from './mp3/pa.mp3';
import audio_pi from './mp3/pi.mp3';
import audio_pu from './mp3/pu.mp3';
import audio_pe from './mp3/pe.mp3';
import audio_po from './mp3/po.mp3';


const Characters = {
    hiragana: [
        "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
        "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
        "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
        "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り",
        "る", "れ", "ろ", "わ", "を", "ん",
        "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ",
        "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ",
        "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"
    ],
    romanji: [
        "a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko",
        "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
        "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho",
        "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
        "ru", "re", "ro", "wa", "wo", "n",
        "ga", "gi", "gu", "ge", "go", "za", "ji", "zu", "ze", "zo",
        "da", "dji", "dzu", "de", "do", "ba", "bi", "bu", "be", "bo",
        "pa", "pi", "pu", "pe", "po"
    ],
    katakana: [
        "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
        "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
        "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
        "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ",
        "ル", "レ", "ロ", "ワ", "ヲ", "ン",
        "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ",
        "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ",
        "パ", "ピ", "プ", "ペ", "ポ"
    ],
    mp3: [
        audio_a, audio_i, audio_u, audio_e, audio_o, audio_ka, audio_ki, audio_ku, audio_ke, audio_ko,
        audio_sa, audio_shi, audio_su, audio_se, audio_so, audio_ta, audio_chi, audio_tsu, audio_te, audio_to,
        audio_na, audio_ni, audio_nu, audio_ne, audio_no, audio_ha, audio_hi, audio_fu, audio_he, audio_ho,
        audio_ma, audio_mi, audio_mu, audio_me, audio_mo, audio_ya, audio_yu, audio_yo, audio_ra, audio_ri,
        audio_ru, audio_re, audio_ro, audio_wa, audio_wo, audio_n,
        audio_ga, audio_gi, audio_gu, audio_ge, audio_go, audio_za, audio_ji, audio_zu, audio_ze, audio_zo,
        audio_da, audio_dji, audio_dzu, audio_de, audio_do, audio_ba, audio_bi, audio_bu, audio_be, audio_bo,
        audio_pa, audio_pi, audio_pu, audio_pe, audio_po
    ]
};

export { Characters };