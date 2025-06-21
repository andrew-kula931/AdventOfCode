import System.IO
import Control.Monad
import Data.Char (isDigit)
import qualified Data.Text as T
import Data.Text
import qualified Data.Map as M

-- Part 1
-- main :: IO ()
-- main = do
--     contents <- readFile "test.txt"
--     let lst = words contents

--     let nums = map (filter isDigit) lst

--     let finalNums = map findValue nums

--     let total = sum finalNums
--     print total 

-- findValue :: String -> Int
-- findValue str = read (head str : [last str]) :: Int

-- Part 2
wordMap :: M.Map Text Text
wordMap = M.fromList
    [ (T.pack "zero", T.pack "0")
    , (T.pack "one", T.pack "1")
    , (T.pack "two", T.pack "2")
    , (T.pack "three", T.pack "3")
    , (T.pack "four", T.pack "4")
    , (T.pack "five", T.pack "5")
    , (T.pack "six", T.pack "6")
    , (T.pack "seven", T.pack "7")
    , (T.pack "eight", T.pack "8")
    , (T.pack "nine", T.pack "9")
    ]

convertWords :: M.Map Text Text -> Text -> Text
convertWords swap str = M.foldrWithKey replace str swap
    where
        replace = T.replace

findValue :: String -> Int
findValue str = read (Prelude.head str : [Prelude.last str]) :: Int

main :: IO ()
main = do
    contents <- readFile "test2.txt"
    let lst = Prelude.lines contents
    print lst

    let packedLst = Prelude.map T.pack lst
    let newLst = Prelude.map (convertWords wordMap) packedLst
    let nums = Prelude.map (Prelude.filter isDigit . T.unpack) newLst
    let finalNums = Prelude.map findValue nums
    let total = sum finalNums
    print total
